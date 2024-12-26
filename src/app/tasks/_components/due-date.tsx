'use client';

import { useAppContext } from '@/app/_components/app-context';
import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const DueDate = ({ task, forPage = 'tasks' }: Props) => {
	const [isPending, startTransition] = useTransition();
	const { updateTask } = useAppContext();

	const handleChangeDueDate = (newDueDate: Date | null) => {
		if (newDueDate === task.dueDate) return;
		startTransition(async () => {
			await updateTask({ id: task.id, dueDate: newDueDate });
		});
	};

	return (
		<DatePicker
			date={task.dueDate}
			onSelect={handleChangeDueDate}
			className={cn('h-9 w-56', forPage === 'notes' && 'w-full text-sm sm:text-sm', isPending && 'opacity-50')}
		/>
	);
};

export default DueDate;
