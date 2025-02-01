'use client';

import CreateTaskForm from '@/app/tasks/_components/create-task-form';
import Task from '@/app/tasks/_components/task';
import { useTasks } from '@/hooks/use-tasks';
import { Course } from '@prisma/client';

type Props = {
	course: Course;
};

const Tasks = ({ course }: Props) => {
	const { data: tasks } = useTasks();

	const handleDrag = (task: Task, e: React.DragEvent) => {};

	const handleDragStart = (task: Task, e: React.DragEvent) => {};

	const handleDragEnd = (task: Task, e: React.DragEvent) => {};

	if (!tasks) return;

	const currentCourseTasks = tasks.filter(task => task.courseId === course.id);

	return (
		<article className='flex flex-col gap-y-4'>
			{currentCourseTasks?.map(task => (
				<Task
					forPage='notes'
					key={task.id}
					task={task}
					onDragEnter={handleDrag}
					onDrop={handleDragEnd}
					onDragStart={handleDragStart}
				/>
			))}

			<CreateTaskForm course={course} forPage='notes' />
		</article>
	);
};

export default Tasks;
