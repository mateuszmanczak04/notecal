'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Card } from '@/components/ui/card';

interface NoteTaskProps {
	task: Task;
}

const NoteTask: FC<NoteTaskProps> = ({
	task: { id, title, completed, courseId, dueDate, priority, description },
}) => {
	const queryClient = useQueryClient();

	const { mutate: toggleCompleted } = useMutation({
		mutationFn: async () => await updateTask({ id, completed: !completed }),
		onMutate: () => {
			queryClient.setQueryData(['tasks'], (prev: { tasks: Task[] }) => {
				const oldTasks = prev.tasks;
				const newTasks = oldTasks.map(task => {
					if (task.id === id) {
						return { ...task, completed: !task.completed };
					}
					return task;
				});
				return { tasks: newTasks };
			});
		},
		onSettled: data => {},
		onError: err => {},
	});

	// todo: add functionalities below
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
				<p className='font-semibold'>{title}</p>
				{description && <p className='text-sm'>{description}</p>}
				{dueDate && (
					<p className='mt-1 rounded-md text-sm'>{dueDate.toDateString()}</p>
				)}
			</div>
		</div>
	);
};

export default NoteTask;
