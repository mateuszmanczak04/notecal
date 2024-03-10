const Course = ({ title }: { title: string }) => {
	return (
		<div className='flex w-full flex-col rounded-md bg-blue-700 p-4 text-lg font-semibold text-white'>
			<p>{title}</p>
			<div className='mt-2 flex w-full justify-between gap-2'>
				<button className='h-8 flex-1 rounded-md bg-white/10 px-3'>
					Notes
				</button>
				<button className='h-8 flex-1 rounded-md bg-white/10 px-3'>Edit</button>
				<button className='h-8 flex-1 rounded-md bg-white/10 px-3'>
					Delete
				</button>
			</div>
		</div>
	);
};

const COURSES = [
	{
		id: 1,
		title: 'Course 1',
	},
	{
		id: 2,
		title: 'Course 2',
	},
	{
		id: 3,
		title: 'Course 3',
	},
];

const page = () => {
	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Your Courses:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				<button className='grid h-12 w-full place-content-center rounded-md bg-gray-100 text-lg font-semibold hover:bg-gray-200'>
					+ Create a New Course
				</button>
				{COURSES.map(course => (
					<Course key={course.id} {...course} />
				))}
			</div>
		</div>
	);
};

export default page;
