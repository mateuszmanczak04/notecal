'use client';

import CreateTaskForm from '@/app/tasks/_components/create-task-form';
import Task from '@/app/tasks/_components/task';
import { useTasksDrag } from '@/app/tasks/hooks/use-tasks-drag';
import { useTasks } from '@/hooks/use-tasks';
import { Course } from '@prisma/client';

type Props = {
	course: Course;
};

const Tasks = ({ course }: Props) => {
	const { data: tasks } = useTasks();
	const { handleDragEnter, handleDragOver, handleDragStart, handleDrop, droppedTaskId } = useTasksDrag({
		tasks: tasks || [],
	});

	if (!tasks) return;

	const currentCourseTasks = tasks.filter(task => task.courseId === course.id);

	return (
		<article className='flex flex-col gap-y-4'>
			{currentCourseTasks?.map(task => (
				<Task
					forPage='notes'
					key={task.id}
					task={task}
					onDragEnter={handleDragEnter}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					onDragStart={handleDragStart}
					isBeingDropped={task.id === droppedTaskId}
				/>
			))}

			<CreateTaskForm course={course} forPage='notes' />
		</article>
	);
};

export default Tasks;
