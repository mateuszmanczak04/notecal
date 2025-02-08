'use client';

import { useTasksFunctionality } from '@/app/tasks/_hooks/use-tasks-functionality';
import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { Course } from '@prisma/client';
import { Reorder } from 'motion/react';
import NoteCreateTaskForm from './note-create-task-form';
import NoteTaskItem from './note-task-item';

type T_Props = {
	course: Course;
};

/** List of tasks for /notes page */
const NoteTasks = ({ course }: T_Props) => {
	const { handleReorder, error, handleSaveNewOrder, hasChangedOrder, isPending, tasks } = useTasksFunctionality({
		courseId: course.id,
	});

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks) return;

	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<p className='font-semibold'>Tasks</p>
			<p className='mt-2 text-sm opacity-75'>Minimalistic subset of tasks from &quot;Tasks&quot; page</p>
			{hasChangedOrder && (
				<Button className='mt-4 w-full' style={{ backgroundColor: course.color }} onClick={handleSaveNewOrder}>
					Save new order
				</Button>
			)}
			{tasks.length > 0 && (
				<div className='mt-4'>
					<Reorder.Group values={tasks} onReorder={handleReorder}>
						{tasks?.map(task => <NoteTaskItem key={task.id} task={task} />)}
					</Reorder.Group>
				</div>
			)}
			<NoteCreateTaskForm course={course} />
		</div>
	);
};

export default NoteTasks;
