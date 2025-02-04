import { useToast } from '@/components/toast/use-toast';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
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

	const containerRef = useRef<HTMLDivElement>(null!);
	const [movedTask, setMovedTask] = useState<Task | null>(null);
	const [movedTaskTop, setMovedTaskTop] = useState<number>(0);
	const [clickOffsetTop, setClickOffsetTop] = useState<number>(0);

	/** Press the task */
	const handleMouseDown = (task: Task, e: React.MouseEvent) => {
		setMovedTask(task);
		const taskTop = e.currentTarget.getBoundingClientRect().top;
		const clickOffset = e.clientY - taskTop;
		setClickOffsetTop(clickOffset);
	};

	const handleMouseEnterTop = (task: Task, e: React.MouseEvent) => {};

	const handleMouseEnterBottom = (task: Task, e: React.MouseEvent) => {};

	useEffect(() => {
		/** Move cursor and reposition it on the list */
		const handleMouseMove = (e: MouseEvent) => {
			if (!movedTask) return;
			const containerTop = containerRef.current.getBoundingClientRect().top;
			setMovedTaskTop(e.clientY - containerTop - clickOffsetTop);
		};

		/** Release and update database */
		const handleMouseUp = (e: MouseEvent) => {
			setMovedTask(null);
			setMovedTaskTop(0);
			if (!movedTask) return;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [movedTask, clickOffsetTop]);

	return {
		containerRef,
		handleMouseDown,
		handleMouseEnterTop,
		handleMouseEnterBottom,
		movedTask,
		movedTaskTop,
	};
};
