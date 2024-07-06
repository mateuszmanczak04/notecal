'use client';

import { Button } from '@/components/ui/button';
import { MoveLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import updateCourse from '@/app/courses/_actions/update-course';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useCourse from '@/app/courses/_hooks/use-course';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import queryClient from '@/lib/query-client';

const EditCoursePage = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const router = useRouter();
	const course = useCourse(id);

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof UpdateCourseSchema>>({
		resolver: zodResolver(UpdateCourseSchema),
		defaultValues: {
			id: course?.id || '',
			newName: course?.name || '',
			newTeacher: course?.teacher || '',
		},
	});

	const onSubmit = (values: z.infer<typeof UpdateCourseSchema>) => {
		setError('');
		startTransition(() => {
			updateCourse(values).then(res => {
				if (res?.error) {
					setError(res.error);
					return;
				}
				queryClient.invalidateQueries({ queryKey: ['courses'] });
				router.push('/courses');
			});
		});
	};

	if (!id || !course) {
		router.push('/courses');
		return;
	}

	return (
		<div className='mx-auto flex max-w-[600px] flex-col gap-4'>
			{/* Cancel button: */}
			<Button
				variant='secondary'
				onClick={() => router.back()}
				className='flex items-center gap-1'>
				<MoveLeft className='h-5' />
				Go back
			</Button>

			{/* Form: */}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='newName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New name</FormLabel>
								<FormControl>
									<Input placeholder='Computer Science' {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='newTeacher'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New teacher</FormLabel>
								<FormControl>
									<Input placeholder='John Doe' {...field} />
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full gap-1'>
						{isPending && <LoadingSpinner />} Save changes
					</Button>
					{error && <ErrorMessage>{error}</ErrorMessage>}
				</form>
			</Form>

			{/* Delete button: */}
			<Link
				href={`/courses/delete?id=${id}`}
				className='flex h-9 shrink-0 items-center justify-center gap-1 rounded-md bg-red-50 px-4 text-red-500 transition hover:bg-red-100'>
				<Trash2 className='h-4 w-4' />
				Delete
			</Link>
		</div>
	);
};

export default EditCoursePage;
