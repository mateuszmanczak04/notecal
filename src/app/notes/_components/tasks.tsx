'use client';

import { Course, Task as T_Task } from '@prisma/client';
import Task from './task';

type Props = {
	course: Course;
	tasks: T_Task[];
};

const Tasks = ({ course, tasks }: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>

			{tasks.length === 0 && <p>There are no tasks related to this course</p>}

			{tasks?.map(task => <Task key={task.id} task={task} />)}

			{/* TODO: Handy new task form here without redirection to the /tasks/create page */}
			{/* <Button asChild style={{ background: course?.color }}>
				<Link prefetch href={`/tasks/create?courseId=${course.id}`}>
					<Plus className='h-4 w-4' /> Create a new task
				</Link>
			</Button> */}
		</div>
	);
};

export default Tasks;
