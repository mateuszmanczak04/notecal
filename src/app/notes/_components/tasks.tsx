'use client';

import CreateTaskForm from '@/app/tasks/_components/create-task-form';
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

			<CreateTaskForm courseId={course.id} forPage='notes' />
		</div>
	);
};

export default Tasks;
