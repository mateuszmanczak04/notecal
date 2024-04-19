import { auth } from '@/auth';
import TaskItem from '@/components/tasks/task-item';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { type Task } from '@/types';
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

	return (
		<div>
			<h1 className='text-2xl font-bold'>Your Tasks To Do:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				{tasks.map(task => (
					<TaskItem
						key={task.id}
						title={task.title}
						courseName={task.course.name}
						description={task.description}
						completed={task.completed}
						dueDate={task.dueDate}
						id={task.id}
						priority={task.priority}
					/>
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
