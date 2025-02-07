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

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
			<legend className='px-2'>Tasks</legend>
			<div className='flex flex-col gap-y-4'>
				{hasChangedOrder && (
					<Button className='w-full' onClick={handleSaveNewOrder}>
						Save new order
					</Button>
				)}
				{tasks && (
					<Reorder.Group values={tasks} onReorder={handleReorder}>
						{tasks?.map(task => <NoteTaskItem key={task.id} task={task} />)}
					</Reorder.Group>
				)}
				<NoteCreateTaskForm course={course} />
			</div>
		</fieldset>
	);
};

export default NoteTasks;
