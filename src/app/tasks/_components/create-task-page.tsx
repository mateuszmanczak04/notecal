'use client';

const CreateTaskPage = () => {
	// const searchParams = useSearchParams();
	// const form = useForm<z.infer<typeof CreateTaskSchema>>({
	// 	resolver: zodResolver(CreateTaskSchema),
	// 	defaultValues: {
	// 		title: '',
	// 		description: '',
	// 		priority: null,
	// 		dueDate: null,
	// 		courseId: searchParams.get('courseId') || null,
	// 	},
	// });
	// const router = useRouter();
	// // const { add: addTask } = useTasks();
	// const [shouldBeDisabled, setShouldBeDisabled] = useState(false);
	// const onSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
	// 	addTask({
	// 		...values,
	// 		courseId: values.courseId,
	// 	});
	// 	setShouldBeDisabled(true);
	// 	// TODO: sort tasks by settings
	// 	router.back();
	// };
	// return (
	// 	<Form {...form}>
	// 		<form
	// 			onSubmit={form.handleSubmit(onSubmit)}
	// 			className='mx-auto mt-4 w-full max-w-[600px] space-y-4 sm:space-y-6 md:space-y-8'>
	// 			<h2 className='text-3xl font-bold'>Create a new task</h2>
	// 			{/* Title: */}
	// 			<FormField
	// 				control={form.control}
	// 				name='title'
	// 				render={({ field }) => (
	// 					<FormItem>
	// 						<FormLabel>
	// 							Title <span className='text-red-500'>*</span>
	// 						</FormLabel>
	// 						<FormControl>
	// 							<Input placeholder='Do some computer graphics homework' {...field} />
	// 						</FormControl>
	// 						<FormDescription />
	// 						<FormMessage />
	// 					</FormItem>
	// 				)}
	// 			/>
	// 			{/* Description: */}
	// 			<FormField
	// 				control={form.control}
	// 				name='description'
	// 				render={({ field }) => (
	// 					<FormItem>
	// 						<FormLabel>Description</FormLabel>
	// 						<FormControl>
	// 							<Input placeholder='Lorem ipsum something else idk' {...field} />
	// 						</FormControl>
	// 						<FormDescription />
	// 						<FormMessage />
	// 					</FormItem>
	// 				)}
	// 			/>
	// 			{/* Priority: */}
	// 			<FormField
	// 				control={form.control}
	// 				name='priority'
	// 				render={({ field }) => (
	// 					<FormItem>
	// 						<FormLabel>Priority</FormLabel>
	// 						<FormControl>
	// 							<CreatePriority field={field} />
	// 						</FormControl>
	// 					</FormItem>
	// 				)}
	// 			/>
	// 			{/* Course: */}
	// 			<FormField
	// 				control={form.control}
	// 				name='courseId'
	// 				render={({ field }) => (
	// 					<FormItem>
	// 						<FormLabel>Course</FormLabel>
	// 						<FormControl>
	// 							<CreateCourse
	// 								className='w-full'
	// 								onSelect={field.onChange}
	// 								currentCourseId={field.value || null}
	// 							/>
	// 						</FormControl>
	// 					</FormItem>
	// 				)}
	// 			/>
	// 			{/* Date picker */}
	// 			<FormField
	// 				control={form.control}
	// 				name='dueDate'
	// 				render={({ field }) => (
	// 					<FormItem>
	// 						<FormLabel>Due date</FormLabel>
	// 						<FormControl>
	// 							<DatePicker date={field.value} onSelect={field.onChange} />
	// 						</FormControl>
	// 					</FormItem>
	// 				)}
	// 			/>
	// 			<div className='grid gap-x-4 gap-y-2 sm:grid-cols-2'>
	// 				<GoBackButton variant='secondary'>Cancel</GoBackButton>
	// 				<Button type='submit' className='w-full' disabled={shouldBeDisabled}>
	// 					Create
	// 				</Button>
	// 			</div>
	// 		</form>
	// 	</Form>
	// );
};

export default CreateTaskPage;
