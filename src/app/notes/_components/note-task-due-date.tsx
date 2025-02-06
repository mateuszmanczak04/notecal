'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import DatePicker from '@/components/date-picker';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type T_Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const NoteTaskDueDate = ({ task, forPage = 'tasks' }: T_Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
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

export default NoteTaskDueDate;
