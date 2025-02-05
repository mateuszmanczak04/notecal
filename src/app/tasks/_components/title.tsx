'use client';

import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const Title = ({ task, forPage = 'tasks' }: Props) => {
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

	return (
		<p
			ref={titleRef}
			contentEditable
			className={cn(
				'cursor-text break-all font-bold outline-none transition-colors',
				isPending && 'pointer-events-none opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Title;
