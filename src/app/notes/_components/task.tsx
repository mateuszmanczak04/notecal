'use client';

import { cn } from '@/lib/utils';
import { type Task } from '@prisma/client';

type Props = {
	task: Task;
};

const Task = ({ task: { id, title, completed, courseId, dueDate, priority, description } }: Props) => {
	const update = () => {};

	const toggleCompleted = () => {
		update({ id, completed: !completed });
	};

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
				'flex cursor-pointer select-none gap-3 rounded-xl bg-neutral-100 p-2 shadow-none dark:bg-neutral-700',
			)}
			onClick={toggleCompleted}>
			<div>
				<p className={cn('font-semibold', completed && 'line-through opacity-50')}>{title}</p>
				{description && <p className={cn('text-sm', completed && 'line-through opacity-50')}>{description}</p>}
				{dueDate && !completed && (
					<p className='mt-1 rounded-xl bg-neutral-200 px-2 py-1 text-sm dark:bg-neutral-600'>
						{dueDate.toDateString()}
					</p>
				)}
			</div>
		</div>
	);
};

export default Task;
