'use client';

import Task from '@/app/tasks/_components/task';
import { Course, Task as T_Task } from '@prisma/client';

type Props = {
	course: Course;
	tasks: T_Task[];
};

const Tasks = ({ course, tasks }: Props) => {
	return (
		<div className='space-y-2'>
			<p className='text-xl font-semibold'>Tasks:</p>

			{tasks.length === 0 && <p>There are no tasks related to this course</p>}

			{tasks?.map(task => <Task forPage='notes' key={task.id} task={task} />)}

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
