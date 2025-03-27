import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { T_Task } from '../../../types';
import { useToast } from '../../toast/use-toast';

export const useTaskDescription = (task: T_Task) => {
	const { description } = task;
	const queryClient = useQueryClient();
	const descriptionRef = useRef<HTMLParagraphElement>(null!);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { description: string }) =>
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

	const handleSubmit = () => {
		const newDescription = descriptionRef.current.innerText;
		// Don't want to update the same value:
		if (newDescription.trim() === description) return;
		mutate({ description: newDescription.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!descriptionRef.current) return;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			descriptionRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			descriptionRef.current.innerText = description;
			descriptionRef.current.blur();
			return;
		}
	};

	// Set initial description:
	useEffect(() => {
		if (!descriptionRef.current) return;
		descriptionRef.current.innerText = description;
	}, [description]);

	return {
		description,
		handleKeyDown,
		isPending,
		descriptionRef,
		handleSubmit,
	};
};
