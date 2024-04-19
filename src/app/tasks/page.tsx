import { auth } from '@/auth';
import TasksList from '@/components/tasks/tasks-list';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();
	if (!session?.user?.id) redirect('/auth/register');

	const tasks = await db.task.findMany({
		where: { userId: session.user.id },
		include: { course: true },
		orderBy: { createdAt: 'desc' },
	});

	const processedTasks = tasks.map(task => ({
		id: task.id,
		title: task.title,
		description: task.description,
		courseName: task.course.name,
		priority: task.priority,
		dueDate: task.dueDate,
		completed: task.completed,
		createdAt: task.createdAt,
	}));

	return (
		<div>
			<h1 className='text-2xl font-bold'>Your Tasks To Do:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				<TasksList tasks={processedTasks} />
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
