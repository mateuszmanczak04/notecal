'use client';

import editCourse from '@/actions/edit-course';
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
import useCourse from '@/hooks/use-course';
import { EditCourseFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

interface EditCourseFormProps {
	id: string;
}

const EditCourseForm: FC<EditCourseFormProps> = ({ id }) => {
	const course = useCourse(id);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof EditCourseFormSchema>>({
		resolver: zodResolver(EditCourseFormSchema),
		defaultValues: {
			id: course?.id || '',
			newName: course?.name || '',
			newTeacher: course?.teacher || '',
		},
	});

	const onSubmit = (values: z.infer<typeof EditCourseFormSchema>) => {
		setError('');
		startTransition(() => {
			editCourse(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
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
					{isPending && <ClipLoader size={20} color='foreground' />} Save
					changes
				</Button>
				{error && (
					<Alert variant='destructive'>
						<AlertTitle className='mb-0'>{error}</AlertTitle>
					</Alert>
				)}
			</form>
		</Form>
	);
};

export default EditCourseForm;
