'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { type Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import LocalTasks from '@/lib/local-tasks';

interface NoteTaskProps {
	task: Task;
}

const Task: FC<NoteTaskProps> = ({
	task: { id, title, completed, courseId, dueDate, priority, description },
}) => {
	const { mutate: toggleCompleted } = useMutation({
		mutationFn: async () => {
			// TODO: optimistic updates
			await updateTask({ id, completed: !completed });
		},
		onMutate: async () => {
			await LocalTasks.update(id, { completed: !completed });
		},
		onSettled: data => {},
		onError: err => {},
	});

	// TODO: add functionalities below
	// const { mutate: updateTitle } = useMutation({
	// 	mutationFn: async () => await updateTaskTitle({ id, newTitle: title }),
	// });

	// const { mutate: updateDescription } = useMutation({
	// 	mutationFn: async () =>
	// 		await updateTaskDescription({ id, newDescription: description }),
	// });

	// const { mutate: updatePriority } = useMutation({
	// 	mutationFn: async () =>
	// 		await updateTaskPriority({ id, newPriority: priority }),
	// });

	return (
		<div
			className={cn(
				'flex cursor-pointer select-none gap-3	 rounded-md p-2 shadow-none',
				priority === 'A' && 'bg-red-100',
				priority === 'B' && 'bg-yellow-100',
				priority === 'C' && 'bg-green-100',
			)}
			onClick={() => toggleCompleted()}>
			<Checkbox
				checked={completed}
				className={cn(
					'border-2 border-primary-500 bg-white',
					priority === 'A' && 'border-red-500 data-[state=checked]:bg-red-500',
					priority === 'B' &&
						'border-yellow-500 data-[state=checked]:bg-yellow-500',
					priority === 'C' &&
						'border-green-500 data-[state=checked]:bg-green-500',
				)}
			/>
			<div>
				<p className={cn('font-semibold', completed && 'line-through')}>
					{title}
				</p>
				{description && (
					<p className={cn('text-sm', completed && 'line-through')}>
						{description}
					</p>
				)}
				{dueDate && !completed && (
					<p className='mt-1 rounded-md text-sm'>{dueDate.toDateString()}</p>
				)}
			</div>
		</div>
	);
};

export default Task;
