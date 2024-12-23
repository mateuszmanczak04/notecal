'use client';

const EditCoursePage = () => {
	return null;

	// const searchParams = useSearchParams();
	// const id = searchParams.get('id');
	// const router = useRouter();
	// const course = {} as Course;
	// const updateCourse = (values: any) => {};

	// const form = useForm<z.infer<typeof UpdateCourseSchema>>({
	// 	resolver: zodResolver(UpdateCourseSchema),
	// 	defaultValues: {
	// 		id: course?.id || '',
	// 		name: course?.name || '',
	// 		teacher: course?.teacher || '',
	// 		color: course?.color || COLORS[0].hex,
	// 	},
	// });

	// const onSubmit = (values: z.infer<typeof UpdateCourseSchema>) => {
	// 	updateCourse(values);
	// 	router.back();
	// };

	// if (!id || !course) {
	// 	router.push('/courses');
	// 	return;
	// }

	// return (
	// 	<div className='mx-auto flex max-w-[600px] flex-col gap-4'>
	// 		{/* Form: */}
	// 		<Form {...form}>
	// 			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
	// 				{/* Color: */}
	// 				<FormField
	// 					control={form.control}
	// 					name='name'
	// 					render={({ field }) => (
	// 						<FormItem>
	// 							<FormLabel>New name</FormLabel>
	// 							<FormControl>
	// 								<Input placeholder='Computer Science' {...field} />
	// 							</FormControl>
	// 							<FormDescription />
	// 							<FormMessage />
	// 						</FormItem>
	// 					)}
	// 				/>

	// 				{/* Teacher: */}
	// 				<FormField
	// 					control={form.control}
	// 					name='teacher'
	// 					render={({ field }) => (
	// 						<FormItem>
	// 							<FormLabel>New teacher</FormLabel>
	// 							<FormControl>
	// 								<Input placeholder='John Doe' {...field} />
	// 							</FormControl>
	// 							<FormDescription />
	// 							<FormMessage />
	// 						</FormItem>
	// 					)}
	// 				/>

	// 				{/* Color: */}
	// 				<FormField
	// 					control={form.control}
	// 					name='color'
	// 					render={({ field }) => (
	// 						<FormItem>
	// 							<FormLabel>Accent color</FormLabel>
	// 							<FormControl>
	// 								<div className='grid grid-cols-3 gap-2 sm:grid-cols-4	md:grid-cols-7'>
	// 									{COLORS.map(color => {
	// 										return (
	// 											<div
	// 												className={cn(
	// 													'grid h-9 w-full cursor-pointer place-content-center rounded-xl border-2 border-transparent font-medium text-white transition-all hover:opacity-90',
	// 													field.value === color.hex && 'border-white/50',
	// 												)}
	// 												style={{
	// 													backgroundColor: color.hex,
	// 												}}
	// 												onClick={() => field.onChange(color.hex)}
	// 												key={color.hex}>
	// 												<span
	// 													className={cn(
	// 														'rounded-xl bg-neutral-900/50 px-1 text-sm leading-5 transition',
	// 														field.value === color.hex ? 'opacity-1' : 'opacity-0',
	// 													)}>
	// 													{color.description}
	// 												</span>
	// 											</div>
	// 										);
	// 									})}
	// 								</div>
	// 							</FormControl>
	// 						</FormItem>
	// 					)}
	// 				/>

	// 				<div className='grid gap-x-4 gap-y-2 pt-4 sm:grid-cols-2'>
	// 					<GoBackButton variant='secondary'>Cancel</GoBackButton>
	// 					<Button type='submit' className='w-full'>
	// 						<Save className='h-4 w-4' />
	// 						Save changes
	// 					</Button>
	// 				</div>
	// 			</form>
	// 		</Form>

	// 		<Separator className='my-8' />

	// 		{/* Delete button: */}
	// 		<Button asChild variant='destructive'>
	// 			<Link prefetch href={`/courses/delete?id=${id}`}>
	// 				<Trash2 className='h-4 w-4' />
	// 				Delete entire course
	// 			</Link>
	// 		</Button>
	// 	</div>
	// );
};

export default EditCoursePage;
