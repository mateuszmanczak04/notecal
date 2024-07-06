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
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import { useQueryClient } from '@tanstack/react-query';
import useCourses from '@/app/courses/_hooks/use-courses';
import CreateTaskSchema from '@/schemas/create-task-schema';
import { cn, OTHER_COURSE_NAME } from '@/lib/utils';
import createTask from '../_actions/create-task';
import queryClient from '@/lib/query-client';
import Tag from '../_components/tag';
import GoBackButton from '@/components/common/go-back-button';
import { ArrowLeft } from 'lucide-react';

const CreateTaskPage = () => {
	const {
		courses,
		isPending: isCoursesPending,
		error: coursesError,
	} = useCourses();

	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof CreateTaskSchema>>({
		resolver: zodResolver(CreateTaskSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: null,
			dueDate: null,
			courseId: searchParams.get('courseId') || OTHER_COURSE_NAME,
		},
	});
	const router = useRouter();

	const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
		setError('');
		startTransition(() => {
			createTask({
				...values,
				// check if courseId should be undefined in request in case it is equal OTHER_COURSE_NAME
				courseId:
					values.courseId === OTHER_COURSE_NAME ? undefined : values.courseId,
			}).then(res => {
				if (res?.error) {
					setError(res.error);
				}
				queryClient.invalidateQueries({ queryKey: ['tasks'] });
				router.back();
			});
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-4 w-full max-w-[600px] space-y-8'>
				<GoBackButton variant='secondary'>
					<ArrowLeft className='h-4 w-4' />
					Go back
				</GoBackButton>
				<h2 className='text-3xl font-bold'>Create a new task</h2>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Title <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Do some computer graphics homework'
									{...field}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder='Lorem ipsum something else idk'
									{...field}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Priority: */}
				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<FormControl>
								<div className='flex gap-2 transition'>
									<Tag
										className={cn(
											'flex-1 bg-green-100 text-green-500 transition-all duration-500 hover:bg-green-200',
											form.getValues('priority') === 'C' &&
												'flex-[2] bg-green-500 text-white hover:bg-green-400',
										)}
										onClick={() => {
											if (form.getValues('priority') === 'C') {
												field.onChange(null);
											} else {
												field.onChange('C');
											}
										}}
										text={'Low'}
									/>
									<Tag
										className={cn(
											'flex-1 bg-yellow-100 text-yellow-500 transition-all duration-500 hover:bg-yellow-200',
											form.getValues('priority') === 'B' &&
												'flex-[2] bg-yellow-500 text-white hover:bg-yellow-300',
										)}
										onClick={() => {
											if (form.getValues('priority') === 'B') {
												field.onChange(null);
											} else {
												field.onChange('B');
											}
										}}
										text={'Medium'}
									/>
									<Tag
										className={cn(
											'flex-1 bg-red-100 text-red-500 transition-all duration-500 hover:bg-red-200',
											form.getValues('priority') === 'A' &&
												'flex-[2] bg-red-500 text-white hover:bg-red-400',
										)}
										onClick={() => {
											if (form.getValues('priority') === 'A') {
												field.onChange(null);
											} else {
												field.onChange('A');
											}
										}}
										text={'High'}
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* TODO: make it work */}
				<FormField
					control={form.control}
					name='courseId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course</FormLabel>
							<FormControl>
								<Tag
									className='w-full flex-1 bg-pink-100 text-pink-500 hover:bg-pink-200'
									onClick={() => field.onChange('nullid')}
									text={'Computer Science'}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* TODO: make it work */}
				<FormField
					control={form.control}
					name='dueDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Due date</FormLabel>
							<FormControl>
								<Tag
									className='w-full flex-1'
									onClick={() => field.onChange(new Date())}
									text={'Computer Science'}
								/>
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

export default CreateTaskPage;
