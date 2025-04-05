import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { T_Task } from '../../../types';
import { useToast } from '../../toast/use-toast';

export const useTaskTitle = (task: T_Task) => {
	const { title } = task;
	const titleRef = useRef<HTMLParagraphElement>(null!);
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { title: string }) =>
			await fetch(`/api/tasks/${task.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	// TODO: delete if title empty

	const handleSubmit = () => {
		const newTitle = titleRef.current.innerText;
		// Don't want to update the same value:
		if (newTitle.trim() === title) return;
		mutate({ title: newTitle.trim() });
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
