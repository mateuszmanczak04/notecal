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
import { cn, COLORS } from '@/lib/utils';
import CreateCourseSchema from '@/schemas/create-course-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useCourses from '../_hooks/use-courses';

const CreateCoursePage = () => {
	const form = useForm<z.infer<typeof CreateCourseSchema>>({
		resolver: zodResolver(CreateCourseSchema),
		defaultValues: {
			name: '',
			teacher: '',
			color: COLORS[0].hex,
		},
	});
	const router = useRouter();
	const { add: addCourse } = useCourses();
	const [shouldBeDisabled, setShouldBeDisabled] = useState(false);

	const onSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
		setShouldBeDisabled(true);
		addCourse(values);
		router.push('/courses');
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-4 w-full max-w-[600px] space-y-4 sm:space-y-6 md:space-y-8'>
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
													field.value === color.hex &&
														'border-white/50',
												)}
												style={{
													backgroundColor: color.hex,
												}}
												onClick={() =>
													field.onChange(color.hex)
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
				<div className='grid gap-x-4 gap-y-2 sm:grid-cols-2'>
					<GoBackButton variant='secondary'>Cancel</GoBackButton>
					<Button type='submit' disabled={shouldBeDisabled}>
						Create
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default CreateCoursePage;
