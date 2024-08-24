'use client';

import useCourse from '@/app/courses/_hooks/use-course';
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
import { Separator } from '@/components/ui/separator';
import { cn, COLORS } from '@/lib/utils';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Trash2 } from 'lucide-react';
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
		router.back();
	};

	if (!id || !course) {
		router.push('/courses');
		return;
	}

	return (
		<div className='mx-auto flex max-w-[600px] flex-col gap-4'>
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

					<div className='grid gap-x-4 gap-y-2 pt-4 sm:grid-cols-2'>
						<GoBackButton variant='secondary'>Cancel</GoBackButton>
						<Button type='submit' className='w-full'>
							<Save className='h-4 w-4' />
							Save changes
						</Button>
					</div>
				</form>
			</Form>

			<Separator className='my-8' />

			{/* Delete button: */}
			<Button asChild variant='destructive'>
				<Link href={`/courses/delete?id=${id}`}>
					<Trash2 className='h-4 w-4' />
					Delete entire course
				</Link>
			</Button>
		</div>
	);
};

export default EditCoursePage;
