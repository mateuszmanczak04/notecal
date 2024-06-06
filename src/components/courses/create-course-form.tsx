'use client';

import createCourse from '@/actions/courses/create-course';
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
import CreateCourseSchema from '@/schemas/create-course-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from '@/components/loading-spinner';
import ErrorMessage from '@/components/error-message';

const CreateCourseForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof CreateCourseSchema>>({
		resolver: zodResolver(CreateCourseSchema),
		defaultValues: {
			name: '',
			teacher: '',
		},
	});
	const router = useRouter();

	const onSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
		setError('');
		startTransition(() => {
			createCourse(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
				router.push('/courses');
			});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Name <span className='text-red-500'>*</span>
							</FormLabel>
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
					name='teacher'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Teacher <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input placeholder='John Doe' {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Create a New Course
				</Button>
				<div className='flex w-full justify-center'>
					{isPending && <LoadingSpinner />}
				</div>
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</form>
		</Form>
	);
};

export default CreateCourseForm;
