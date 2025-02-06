'use client';

import CreateTaskForm from '@/app/tasks/_components/create-task-form';
import Task from '@/app/tasks/_components/task';
import { useTasksFunctionality } from '@/app/tasks/_hooks/use-tasks-functionality';
import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { Course } from '@prisma/client';
import { Reorder } from 'motion/react';

type T_Props = {
	course: Course;
};

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
		<article className='flex flex-col gap-y-4'>
			{hasChangedOrder && (
				<Button className='w-full' onClick={handleSaveNewOrder}>
					Save new order
				</Button>
			)}
			{tasks && (
				<Reorder.Group values={tasks} onReorder={handleReorder}>
					{tasks?.map(task => <Task forPage='notes' key={task.id} task={task} />)}
				</Reorder.Group>
			)}
			<CreateTaskForm course={course} forPage='notes' />
		</article>
	);
};

export default NoteTasks;
