'use client';

import updateTaskCompleted from '@/actions/tasks/update-task-completed';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

interface NoteTaskProps {
	task: Task;
}

const NoteTask: FC<NoteTaskProps> = ({
	task: { id, title, completed, courseId, dueDate, priority, description },
}) => {
	const queryClient = useQueryClient();

	const { mutate: toggleCompleted } = useMutation({
		mutationFn: async () =>
			await updateTaskCompleted({ id, newValue: !completed }),
		onMutate: () => {
			queryClient.setQueryData(
				['course-tasks', courseId],
				(prev: { tasks: Task[] }) => {
					const oldTasks = prev.tasks;
					const newTasks = oldTasks.map(task => {
						if (task.id === id) {
							return { ...task, completed: !task.completed };
						}
						return task;
					});
					return { tasks: newTasks };
				},
			);
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
		<div className='relative flex flex-col overflow-hidden rounded-md bg-gray-100'>
			<div className='flex gap-2 p-4'>
				<Checkbox
					checked={completed}
					onCheckedChange={() => toggleCompleted()}
				/>
				<div className='-mt-1'>
					<p className='text-normal font-semibold'>{title}</p>
					<p className='text-sm opacity-75'>{description}</p>
				</div>
			</div>
			{dueDate && (
				<p className='mt-1 bg-gray-200 px-2 py-1 text-xs opacity-75'>
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
		</div>
	);
};

export default NoteTask;
