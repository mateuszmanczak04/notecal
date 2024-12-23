'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Course } from '@prisma/client';
import Task from './task';

type Props = {
	course: Course;
};

const Tasks = ({ course }: Props) => {
	const { tasks: allTasks } = useAppContext();
	const tasks = allTasks.filter(task => task.courseId === course.id);

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>

			{tasks?.map(task => <Task key={task.id} task={task} />)}
			{/* <Button asChild style={{ background: course?.color }}>
				<Link prefetch href={`/tasks/create?courseId=${course.id}`}>
					<Plus className='h-4 w-4' /> Create a new task
				</Link>
			</Button> */}
		</div>
	);
};

export default Tasks;
