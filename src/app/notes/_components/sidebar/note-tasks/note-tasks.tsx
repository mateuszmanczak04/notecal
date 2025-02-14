'use client';

import { useNoteContext } from '@/app/notes/_content/note-context';
import { useTasksFunctionality } from '@/app/tasks/_hooks/use-tasks-functionality';
import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { Reorder } from 'motion/react';
import NoteCreateTaskForm from './note-create-task-form';
import NoteTaskItem from './note-task-item';

/** List of tasks for /notes page */
const NoteTasks = () => {
	const { currentCourse } = useNoteContext();
	const { handleReorder, error, handleSaveNewOrder, hasChangedOrder, isPending, tasks } = useTasksFunctionality({
		courseId: currentCourse?.id,
	});

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks) return;

	if (!currentCourse) return;

	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			{hasChangedOrder && (
				<Button
					className='mb-4 w-full'
					style={{ backgroundColor: currentCourse.color }}
					onClick={handleSaveNewOrder}>
					Save new order
				</Button>
			)}
			{tasks.length > 0 && (
				<div className='mb-2'>
					<Reorder.Group values={tasks} onReorder={handleReorder}>
						{tasks?.map(task => <NoteTaskItem key={task.id} task={task} />)}
					</Reorder.Group>
				</div>
			)}
			<NoteCreateTaskForm course={currentCourse} />
		</div>
	);
};

export default NoteTasks;
