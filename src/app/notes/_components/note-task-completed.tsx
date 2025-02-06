'use client';

import { useTaskCompleted } from '@/app/tasks/_hooks/use-task-completed';
import { Checkbox } from '@/components/checkbox';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';

type T_Props = {
	task: Task;
};

const NoteTaskCompleted = ({ task }: T_Props) => {
	const { handleToggleTaskCompleted, isTaskCompletedChangePending } = useTaskCompleted(task);

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={handleToggleTaskCompleted}
			className={cn('size-5', isTaskCompletedChangePending && 'pointer-events-none  opacity-50')}
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default NoteTaskCompleted;
