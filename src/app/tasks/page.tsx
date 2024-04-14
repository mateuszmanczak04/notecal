import { Button } from '@/components/ui/button';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const Task = ({
	title,
	description,
	course,
	priority,
	date,
}: {
	title: string;
	description: string;
	course: string;
	priority: number;
	date: string;
}) => {
	return (
		<div className='rounded-md bg-gray-100 p-4'>
			<p className='text-xl font-semibold'>{title}</p>
			<p className='text-gray-500'>{description}</p>
			<div className='mt-2 flex gap-1'>
				<p className='h-6 min-w-16 rounded-md bg-purple-600 px-1 text-center leading-6 text-white'>
					{course}
				</p>
				<p className='h-6 min-w-16 rounded-md bg-green-500 px-1 text-center leading-6'>
					Low
				</p>
				<p className='h-6 min-w-16 rounded-md bg-gray-200 px-1 text-center leading-6'>
					{date}
				</p>
			</div>
			<Button size='sm' className='mt-2 w-full'>
				Done
			</Button>
		</div>
	);
};

const TASKS = [
	{
		id: 1,
		title: 'Task 1',
		description: 'Description 1',
		course: 'Course 1',
		priority: 1,
		date: '12.12.2024',
	},
	{
		id: 2,
		title: 'Task 2',
		description: 'Description 2',
		course: 'Course 2',
		priority: 2,
		date: '13.12.2024',
	},
	{
		id: 3,
		title: 'Task 3',
		description: 'Description 3',
		course: 'Course 3',
		priority: 3,
		date: '14.12.2024',
	},
	{
		id: 4,
		title: 'Task 4',
		description: 'Description 4',
		course: 'Course 4',
		priority: 4,
		date: '15.12.2024',
	},
	{
		id: 5,
		title: 'Task 5',
		description: 'Description 5',
		course: 'Course 5',
		priority: 5,
		date: '16.12.2024',
	},
];

const page = async () => {
	const session = await auth();
	if (!session) redirect('/auth/signup');

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Your Tasks To Do:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				<Button variant='secondary' size='lg' className='w-full'>
					+ Add Task
				</Button>
				{TASKS.map(task => (
					<Task key={task.id} {...task} />
				))}
			</div>
		</div>
	);
};

export default page;
