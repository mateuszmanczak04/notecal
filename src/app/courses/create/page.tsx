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
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

	const onSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
		addCourse(values);
		router.push('/courses');
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
													'flex h-9 w-full flex-1 cursor-pointer items-center justify-center rounded-md border-2 border-transparent font-medium text-white transition-all hover:opacity-90',
													field.value === color.hex &&
														'h-12 flex-[2] border-white/50',
												)}
												style={{ backgroundColor: color.hex }}
												onClick={() => field.onChange(color.hex)}
												key={color.hex}>
												<span
													className={cn(
														'rounded-sm bg-neutral-900/50 px-1 leading-5 transition',
														field.value === color.hex
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
					Create
				</Button>
			</form>
		</Form>
	);
};

export default CreateCoursePage;
