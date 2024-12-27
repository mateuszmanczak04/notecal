'use client';

import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const DueDate = ({ task, forPage = 'tasks' }: Props) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const handleChangeDueDate = (newDueDate: Date | null) => {
		if (newDueDate === task.dueDate) return;
		mutate({ id: task.id, dueDate: newDueDate });
	};

	return (
		<DatePicker
			date={task.dueDate}
			onSelect={handleChangeDueDate}
			className={cn(
				'h-9 w-56',
				forPage === 'notes' && 'w-full text-sm sm:text-sm',
				isPending && 'pointer-events-none opacity-50',
			)}
		/>
	);
};

export default DueDate;
