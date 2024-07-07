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
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import CreateTaskSchema from '@/schemas/create-task-schema';
import { cn } from '@/lib/utils';
import createTask from '../_actions/create-task';
import queryClient from '@/lib/query-client';
import Tag from '../_components/tag';
import GoBackButton from '@/components/common/go-back-button';
import { ArrowLeft } from 'lucide-react';
import Course from './course';
import Priority from './priority';
import DatePicker from '../../../components/common/date-picker';
import { Task } from '@prisma/client';
import Tasks from '@/app/notes/_components/tasks';
import LocalTasks from '@/lib/local-tasks';

const CreateTaskPage = () => {
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
			courseId: searchParams.get('courseId') || null,
		},
	});
	const router = useRouter();

	const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
		setError('');
		startTransition(async () => {
			// TODO: optimistic updates
			const { task } = await createTask({
				...values,
				courseId: values.courseId,
			});
			if (!task) return;
			await LocalTasks.append(task);
			router.back();
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

				{/* Title: */}
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

				{/* Description: */}
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
								<Priority field={field} />
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Course: */}
				<FormField
					control={form.control}
					name='courseId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course</FormLabel>
							<FormControl>
								<Course
									onSelect={field.onChange}
									currentCourseId={field.value || null}
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
								<DatePicker date={field.value} onSelect={field.onChange} />
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
