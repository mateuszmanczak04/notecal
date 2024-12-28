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
		<article className='space-y-4'>
			{tasks?.map(task => <Task forPage='notes' key={task.id} task={task} />)}

			<CreateTaskForm courseId={course.id} forPage='notes' />
		</article>
	);
};

export default Tasks;
