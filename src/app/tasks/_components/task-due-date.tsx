'use client';

import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTaskDueDate } from '../_hooks/use-task-due-date';

type T_Props = {
	task: Task;
};

const TaskDueDate = ({ task }: T_Props) => {
	const { updateTaskDueDate, isPending } = useTaskDueDate(task);

	return (
		<DatePicker
			date={task.dueDate}
			onSelect={updateTaskDueDate}
			className={cn('h-9 w-56', isPending && 'pointer-events-none opacity-50')}
		/>
	);
};

export default TaskDueDate;
