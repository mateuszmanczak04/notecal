'use client';

import editCourse from '@/actions/editCourse';
import { Button } from '@/components/ui/button';
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
import { EditCourseFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

const EditCoursePage = () => {
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const router = useRouter();
	const form = useForm<z.infer<typeof EditCourseFormSchema>>({
		resolver: zodResolver(EditCourseFormSchema),
		defaultValues: {
			newName: '',
			newTeacher: '',
		},
	});

	useEffect(() => {
		const courseId = searchParams.get('id');
		if (!courseId || typeof courseId !== 'string') {
			router.replace('/courses');
		} else {
			form.setValue('id', courseId);
		}
	}, [searchParams, form, router]);

	const onSubmit = (values: z.infer<typeof EditCourseFormSchema>) => {
		console.log('wow');
		console.log(values);
		setError('');
		startTransition(() => {
			editCourse(values)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		});
	};

	return (
		<div>
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
					<Button type='submit' className='w-full'>
						Save changes
					</Button>
					<div className='flex w-full justify-center'>
						{isPending && <ClipLoader className='mx-auto' />}
					</div>
					{/* todo - display potential error */}
				</form>
			</Form>
			<Button asChild variant='destructive' className='w-full gap-1'>
				<Link
					href={`/courses/delete?id=${form.getValues().id}&name=${'todo - put the name here'}`}>
					<Trash2 className='h-4 w-4' />
					Delete Course
				</Link>
			</Button>
		</div>
	);
};

export default EditCoursePage;
