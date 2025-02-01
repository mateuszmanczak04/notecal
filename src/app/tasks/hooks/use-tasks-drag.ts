import { useToast } from '@/components/toast/use-toast';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import updateTask, { T_UpdateTaskInput } from '../_actions/update-task';

type T_Props = {
	tasks: Task[];
};

export const useTasksDrag = ({ tasks }: T_Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate } = useMutation({
		mutationFn: updateTask,
		onMutate: (data: T_UpdateTaskInput) => {
			queryClient.setQueryData(['tasks'], (prev: Task[]) =>
				prev.map(task => {
					if (task.id === data.id) {
						return { ...task, weight: data.weight };
					}
					return task;
				}),
			);
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
	const [droppedTaskId, setDroppedTaskId] = useState<string | null>(null);

	const handleDragStart = (task: Task, e: React.DragEvent) => {
		setDraggedTaskId(task.id);
	};

	const handleDragEnter = (task: Task, e: React.DragEvent) => {
		if (!draggedTaskId) return;
		setDroppedTaskId(task.id);
	};

	// Necessary for handleDrop to work
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (task: Task, e: React.DragEvent) => {
		if (!draggedTaskId || !droppedTaskId) return;

		const droppedTaskIndex = tasks.findIndex(task => task.id === droppedTaskId);
		const droppedTask = tasks[droppedTaskIndex];
		const taskAfterDroppedTask = tasks[droppedTaskIndex + 1];
		if (!taskAfterDroppedTask) {
			mutate({ id: draggedTaskId, weight: droppedTask.weight + 10000 });
		} else {
			mutate({ id: draggedTaskId, weight: (droppedTask.weight + taskAfterDroppedTask.weight) / 2 });
		}

		setDraggedTaskId(null);
		setDroppedTaskId(null);
	};

	return { handleDragStart, handleDragEnter, handleDragOver, handleDrop, droppedTaskId };
};
