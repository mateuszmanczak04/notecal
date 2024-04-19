import { auth } from '@/auth';
import TasksList from '@/components/tasks/tasks-list';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();
	if (!session?.user?.id) redirect('/auth/register');

	const tasks = await db.task.findMany({
		where: { userId: session.user.id },
		include: { course: true },
		orderBy: { title: 'asc' },
	});

	const processedTasks = tasks.map(task => ({
		id: task.id,
		title: task.title,
		description: task.description,
		courseName: task?.course?.name || '',
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
			</div>
		</div>
	);
};

export default page;
