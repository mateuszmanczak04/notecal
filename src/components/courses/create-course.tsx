'use client';

import createCourse from '@/actions/create-course';
import { Alert, AlertTitle } from '@/components/ui/alert';
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
import { Separator } from '@/components/ui/separator';
import { CreateCourseFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

const CreateCourse = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof CreateCourseFormSchema>>({
		resolver: zodResolver(CreateCourseFormSchema),
		defaultValues: {
			name: '',
			teacher: '',
		},
	});

	const onSubmit = (values: z.infer<typeof CreateCourseFormSchema>) => {
		setError('');
		startTransition(() => {
			createCourse(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
			});
		});
	};

	return (
		<div className='mx-auto max-w-screen-sm p-4'>
			<h1 className='text-2xl font-semibold'>Create a New Course</h1>
			<Separator className='mb-6 mt-2' />
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
						{isPending && <ClipLoader className='mx-auto' />}
					</div>
					{error && (
						<Alert variant='destructive'>
							<AlertTitle className='mb-0'>{error}</AlertTitle>
						</Alert>
					)}
				</form>
			</Form>
		</div>
	);
};

export default CreateCourse;