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
import { MoveLeft, Save, Trash2 } from 'lucide-react';
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
			<Button variant='secondary' onClick={() => router.back()}>
				<MoveLeft />
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
									<div className='grid grid-cols-3 gap-2 sm:grid-cols-4	md:grid-cols-7'>
										{COLORS.map(color => {
											return (
												<div
													className={cn(
														'grid h-9 w-full cursor-pointer place-content-center rounded-xl border-2 border-transparent font-medium text-white transition-all hover:opacity-90',
														field.value ===
															color.hex &&
															'border-white/50',
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
															'rounded-xl bg-neutral-900/50 px-1 text-sm leading-5 transition',
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

					<Button type='submit' className='w-full'>
						<Save />
						Save changes
					</Button>
				</form>
			</Form>

			{/* Delete button: */}
			<Button asChild variant='destructive'>
				<Link href={`/courses/delete?id=${id}`}>
					<Trash2 />
					Delete
				</Link>
			</Button>
		</div>
	);
};

export default EditCoursePage;
