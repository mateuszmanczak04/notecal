const Course = ({ title }: { title: string }) => {
	return (
		<div className='bg-blue-700 text-white w-full flex flex-col font-semibold text-lg rounded-md p-4'>
			<p>{title}</p>
			<div className='flex w-full justify-between mt-2 gap-2'>
				<button className='bg-white/10 h-8 px-3 rounded-md flex-1'>
					Notes
				</button>
				<button className='bg-white/10 h-8 px-3 rounded-md flex-1'>Edit</button>
				<button className='bg-white/10 h-8 px-3 rounded-md flex-1'>
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
			<div className='flex flex-col gap-2 mt-2'>
				<button className='bg-gray-100 hover:bg-gray-200 w-full h-12 grid place-content-center font-semibold text-lg rounded-md'>
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
