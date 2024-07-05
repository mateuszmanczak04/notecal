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
		<Card
			className='relative flex cursor-pointer select-none flex-col overflow-hidden border-none bg-primary/5 shadow-none dark:bg-white/5'
			onClick={() => toggleCompleted()}>
			<div className='flex gap-2 p-4'>
				<Checkbox checked={completed} className='h-5 w-5' />
				<div className='-mt-1'>
					<p className='text-normal font-semibold'>{title}</p>
					<p className='text-sm opacity-75'>{description}</p>
				</div>
			</div>
			{dueDate && (
				<p className='mt-1 bg-primary/10 px-2 py-1 text-xs dark:bg-white/15'>
					{dueDate.toDateString()}
				</p>
			)}
			<div
				className={cn(
					'h-1 w-full',
					priority === 'A' && 'bg-red-500 text-white',
					priority === 'B' && 'bg-amber-500 text-white',
					priority === 'C' && 'bg-green-500 text-white',
				)}></div>
		</Card>
	);
};

export default NoteTask;
