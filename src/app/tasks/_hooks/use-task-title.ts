import { useToast } from '@/components/toast/use-toast';
import { Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import updateTask from '../_actions/update-task';

export const useTaskTitle = (task: T_Task) => {
	const { id, title } = task;
	const titleRef = useRef<HTMLParagraphElement>(null!);
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

	const handleSubmit = () => {
		const newTitle = titleRef.current.innerText;
		// Don't want to update the same value:
		if (newTitle.trim() === title) return;
		mutate({ id, title: newTitle.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!titleRef.current) return;
		if (event.key === 'Enter') {
			event.preventDefault();
			titleRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			titleRef.current.innerText = title;
			titleRef.current.blur();
			return;
		}
	};

	// Set initial title:
	useEffect(() => {
		if (!titleRef.current) return;
		titleRef.current.innerText = title;
	}, [title]);

	return {
		titleRef,
		isPending,
		handleSubmit,
		handleKeyDown,
	};
};
