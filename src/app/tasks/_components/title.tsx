'use client';

import { useAppContext } from '@/app/_components/app-context';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useEffect, useRef, useTransition } from 'react';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const Title = ({ task, forPage = 'tasks' }: Props) => {
	const { id, title, completed } = task;
	const titleRef = useRef<HTMLParagraphElement | null>(null);
	const [isPending, startTransition] = useTransition();
	const { updateTask, deleteTask } = useAppContext();

	const handleSubmit = () => {
		if (!titleRef.current) return;

		const newTitle = titleRef.current.innerText;

		// We remove the task if title is empty
		if (newTitle.trim().length === 0) {
			startTransition(async () => {
				await deleteTask({ id });
			});
		}

		// Don't want to update the same value:
		if (newTitle.trim() === title) return;

		startTransition(async () => {
			await updateTask({ id, title: newTitle });
		});
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
			contentEditable={!completed}
			className={cn(
				'font-bold outline-none transition-colors',
				completed && 'line-through',
				isPending && 'opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Title;
