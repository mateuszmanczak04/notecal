'use client';

import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTaskTitle } from '../_hooks/use-task-title';

type T_Props = {
	task: Task;
};

const TaskTitle = ({ task }: T_Props) => {
	const { handleKeyDown, handleSubmit, isPending, titleRef } = useTaskTitle(task);

	return (
		<p
			ref={titleRef}
			contentEditable
			className={cn(
				'cursor-text break-all text-sm font-semibold outline-none transition-colors',
				isPending && 'pointer-events-none opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default TaskTitle;
