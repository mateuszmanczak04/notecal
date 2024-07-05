'use client';

import createCourse from '@/app/courses/_actions/create-course';
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
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import { useQueryClient } from '@tanstack/react-query';

const CreateCoursePage = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof CreateCourseSchema>>({
		resolver: zodResolver(CreateCourseSchema),
		defaultValues: {
			name: '',
			teacher: '',
			color: '',
		},
	});
	const router = useRouter();
	const queryClient = useQueryClient();

	const onSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
		setError('');
		startTransition(() => {
			createCourse(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
				queryClient.invalidateQueries({ queryKey: ['courses'] });
				router.push('/courses');
			});
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-4 w-full max-w-[600px] space-y-8'>
				<h2 className='text-3xl font-bold'>Create a new course</h2>
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
				{/* TODO: move existing colors to separate file and make use of them 
				on the backend */}
				<FormField
					control={form.control}
					name='color'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Accent color</FormLabel>
							<FormControl>
								<div className='flex gap-2'>
									<div
										className='bg-accent-1-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-1')}></div>
									<div
										className='bg-accent-2-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-2')}></div>
									<div
										className='bg-accent-3-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-2')}></div>
									<div
										className='bg-accent-4-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-3')}></div>
									<div
										className='bg-accent-5-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-4')}></div>
									<div
										className='bg-accent-6-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-5')}></div>
									<div
										className='bg-accent-7-500 h-9 flex-1 cursor-pointer rounded-md transition hover:opacity-90'
										onClick={() => field.onChange('accent-6')}></div>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Create
				</Button>
				<div className='flex w-full justify-center'>
					{isPending && <LoadingSpinner />}
				</div>
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</form>
		</Form>
	);
};

export default CreateCoursePage;
