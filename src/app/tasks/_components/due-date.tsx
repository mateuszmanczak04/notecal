'use client';

import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/utils';
import { Task } from '@prisma/client';
import { useTransition } from 'react';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
};

const DueDate = ({ task }: Props) => {
	const [isPending, startTransition] = useTransition();

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
			className={cn('h-9 w-56', isPending && 'opacity-50')}
		/>
	);
};

export default DueDate;
