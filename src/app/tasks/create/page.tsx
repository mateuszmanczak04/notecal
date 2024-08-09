'use client';

import GoBackButton from '@/components/common/go-back-button';
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
import CreateTaskSchema from '@/schemas/create-task-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DatePicker from '../../../components/common/date-picker';
import Course from '../_components/course';
import CreatePriority from '../_components/create-priority';
import useTasks from '../_hooks/use-tasks';

const CreateTaskPage = () => {
	const searchParams = useSearchParams();
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
	const { add: addTask } = useTasks();

	const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
		addTask({
			...values,
			courseId: values.courseId,
		});
		// TODO: sort tasks by settings

		router.back();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-4 w-full max-w-[600px] space-y-4 sm:space-y-6 md:space-y-8'>
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
								<CreatePriority field={field} />
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

				{/* Date picker */}
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
			</form>
		</Form>
	);
};

export default CreateTaskPage;
