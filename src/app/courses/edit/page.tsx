'use client';

import useCourse from '@/app/courses/_hooks/use-course';
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
import { cn, COLORS } from '@/lib/utils';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useCourses from '../_hooks/use-courses';

const EditCoursePage = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const router = useRouter();
	const course = useCourse(id);
	const { update: updateCourse } = useCourses();

	const form = useForm<z.infer<typeof UpdateCourseSchema>>({
		resolver: zodResolver(UpdateCourseSchema),
		defaultValues: {
			id: course?.id || '',
			name: course?.name || '',
			teacher: course?.teacher || '',
			color: course?.color || COLORS[0].hex,
		},
	});

	const onSubmit = (values: z.infer<typeof UpdateCourseSchema>) => {
		updateCourse(values);
		router.push('/courses');
	};

	if (!id || !course) {
		router.push('/courses');
		return;
	}

	return (
		<div className='mx-auto flex max-w-[600px] flex-col gap-4'>
			{/* Cancel button: */}
			<Button
				variant='secondary'
				onClick={() => router.back()}
				className='flex items-center gap-1'>
				<MoveLeft className='h-5' />
				Go back
			</Button>

			{/* Form: */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-2'>
					{/* Color: */}
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New name</FormLabel>
								<FormControl>
									<Input
										placeholder='Computer Science'
										{...field}
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Teacher: */}
					<FormField
						control={form.control}
						name='teacher'
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

					{/* Color: */}
					<FormField
						control={form.control}
						name='color'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Accent color</FormLabel>
								<FormControl>
									<div className='flex h-12 items-center gap-2'>
										{COLORS.map(color => {
											return (
												<div
													className={cn(
														'flex h-9 w-full flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-transparent font-medium text-white transition-all hover:opacity-90',
														field.value ===
															color.hex &&
															'h-12 flex-[2] border-white/50',
													)}
													style={{
														backgroundColor:
															color.hex,
													}}
													onClick={() =>
														field.onChange(
															color.hex,
														)
													}
													key={color.hex}>
													<span
														className={cn(
															'rounded-xl bg-neutral-900/50 px-1 leading-5 transition',
															field.value ===
																color.hex
																? 'opacity-1'
																: 'opacity-0',
														)}>
														{color.description}
													</span>
												</div>
											);
										})}
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full gap-1'>
						Save changes
					</Button>
				</form>
			</Form>

			{/* Delete button: */}
			<Link
				href={`/courses/delete?id=${id}`}
				className='flex h-9 shrink-0 items-center justify-center gap-1 rounded-xl bg-red-50 px-4 text-red-500 transition hover:bg-red-100'>
				<Trash2 />
				Delete
			</Link>
		</div>
	);
};

export default EditCoursePage;
