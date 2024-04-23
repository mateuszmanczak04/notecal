'use client';

import createTask from '@/actions/create-task';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import useCourses from '@/hooks/use-courses';
import queryClient from '@/lib/query-client';
import { OTHER_COURSE_NAME, cn } from '@/lib/utils';
import { CreateTaskFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

const CreateTaskForm = () => {
	const { data } = useCourses();
	const courses = data?.courses || [];

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof CreateTaskFormSchema>>({
		resolver: zodResolver(CreateTaskFormSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: undefined,
			dueDate: undefined,
			courseId: OTHER_COURSE_NAME,
		},
	});
	const router = useRouter();

	const onSubmit = (values: z.infer<typeof CreateTaskFormSchema>) => {
		setError('');
		startTransition(() => {
			createTask(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
				queryClient.invalidateQueries({ queryKey: ['tasks'] });
				router.push('/tasks');
			});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
									placeholder='Do the Computer Graphics homework'
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
							<FormLabel>Teacher</FormLabel>
							<FormControl>
								<Textarea placeholder='Something useful' rows={5} {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				{courses && courses.length > 0 && (
					<FormField
						control={form.control}
						name='courseId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Course <span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger
												className={cn(
													'pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}>
												<SelectValue placeholder='Choose from the list' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{courses.map(course => (
												<SelectItem key={course.id} value={course.id}>
													{course.name}
												</SelectItem>
											))}
											<SelectItem key='other' value={OTHER_COURSE_NAME}>
												Other
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col space-y-1'>
									<FormItem className='flex cursor-pointer items-center space-x-2 space-y-0'>
										<FormControl>
											<RadioGroupItem className='text-red-500' value='high' />
										</FormControl>
										<FormLabel className='cursor-pointer'>High</FormLabel>
									</FormItem>
									<FormItem className='flex cursor-pointer items-center space-x-2 space-y-0'>
										<FormControl>
											<RadioGroupItem
												className='text-amber-500'
												value='medium'
											/>
										</FormControl>
										<FormLabel className='cursor-pointer'>Medium</FormLabel>
									</FormItem>
									<FormItem className='flex cursor-pointer items-center space-x-2 space-y-0'>
										<FormControl>
											<RadioGroupItem className='text-green-500' value='low' />
										</FormControl>
										<FormLabel className='cursor-pointer'>Low</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator />
				<FormField
					control={form.control}
					name='dueDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Due Date</FormLabel>

							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={date => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Create a New Task
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
	);
};

export default CreateTaskForm;
