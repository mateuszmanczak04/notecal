'use client';

import { useTaskCompleted } from '@/app/tasks/_hooks/use-task-completed';
import { Checkbox } from '@/components/checkbox';
import { cn } from '@/utils/cn';
import { Task as T_Task } from '@prisma/client';

type T_Props = {
	task: T_Task;
};

const NoteTaskCompleted = ({ task }: T_Props) => {
	const { isPending, toggleTaskCompleted } = useTaskCompleted(task);

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={toggleTaskCompleted}
			className={cn('size-5 data-[state=checked]:bg-primary-500', isPending && 'pointer-events-none opacity-50')}
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default NoteTaskCompleted;
