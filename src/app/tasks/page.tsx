import TaskItem from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { type Task } from '@/types';
import { auth } from '@/utils/auth';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';

const TASKS: Task[] = [
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
		priority: 3,
		date: '15.12.2024',
	},
	{
		id: 5,
		title: 'Task 5',
		description: 'Description 5',
		course: 'Course 5',
		priority: 1,
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
					<Plus className='h-6 w-6' /> Add Task
				</Button>
				{TASKS.map(task => (
					<TaskItem key={task.id} {...task} />
				))}
			</div>
		</div>
	);
};

export default page;
