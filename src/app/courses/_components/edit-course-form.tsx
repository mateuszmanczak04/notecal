'use client';

import updateCourse from '@/actions/courses/update-course';
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
import useCourse from '@/app/courses/_hooks/use-course';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';

interface EditCourseFormProps {
	id: string;
}

const EditCourseForm: FC<EditCourseFormProps> = ({ id }) => {
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
	const router = useRouter();
	const queryClient = useQueryClient();

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

	if (!course) {
		return <p>No course found</p>;
	}

	return (
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
	);
};

export default EditCourseForm;
