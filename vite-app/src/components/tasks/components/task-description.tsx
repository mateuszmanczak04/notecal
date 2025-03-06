'use client';

import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTaskDescription } from '../hooks/use-task-description';

type T_Props = {
	task: Task;
};

const TaskDescription = ({ task }: T_Props) => {
	const { description, descriptionRef, handleKeyDown, handleSubmit, isPending } = useTaskDescription(task);

	return (
		<p
			ref={descriptionRef}
			contentEditable
			className={cn(
				'mt-1 cursor-text break-all text-sm text-neutral-500 outline-none dark:text-neutral-400',
				description.trim().length === 0 && 'mb-0 h-4 focus:mb-2 focus:h-auto',
				description.trim().length > 0 && 'mb-2',
				isPending && 'pointer-events-none mb-2 h-auto opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default TaskDescription;
