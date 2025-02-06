'use client';

import { useTaskDueDate } from '@/app/tasks/_hooks/use-task-due-date';
import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';

type T_Props = {
	task: Task;
};

const NoteTaskDueDate = ({ task }: T_Props) => {
	const { updateTaskDueDate, isPending } = useTaskDueDate(task);

	return (
		<DatePicker
			date={task.dueDate}
			onSelect={updateTaskDueDate}
			className={cn('h-9 w-56', isPending && 'pointer-events-none opacity-50')}
		/>
	);
};

export default NoteTaskDueDate;
