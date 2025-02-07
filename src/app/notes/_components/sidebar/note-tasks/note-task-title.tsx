'use client';

import { useTaskTitle } from '@/app/tasks/_hooks/use-task-title';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';

type T_Props = {
	task: Task;
};

const NoteTaskTitle = ({ task }: T_Props) => {
	const { handleKeyDown, handleSubmit, isPending, titleRef } = useTaskTitle(task);

	return (
		<p
			ref={titleRef}
			contentEditable
			className={cn(
				'cursor-text break-all text-sm font-bold outline-none transition-colors',
				isPending && 'pointer-events-none opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default NoteTaskTitle;
