import { auth } from '@/auth';
import TaskItem from '@/components/task-item';
import { Button } from '@/components/ui/button';
import { type Task } from '@/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
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
	if (!session) redirect('/auth/register');

	return (
		<div>
			<h1 className='text-2xl font-bold'>Your Tasks To Do:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				{TASKS.map(task => (
					<TaskItem key={task.id} {...task} />
				))}
				<Button
					asChild
					variant='secondary'
					size='lg'
					className='flex items-center justify-center gap-1 font-semibold'>
					<Link href='/tasks/create'>
						<Plus className='h-6 w-6' /> Create a New Task
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default page;
