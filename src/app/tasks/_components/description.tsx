'use client';

import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useEffect, useRef, useTransition } from 'react';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
};

const Description = ({ task }: Props) => {
	const { id, description, completed } = task;
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		if (!descriptionRef.current) return;

		const newDescription = descriptionRef.current.innerText;

		// Don't want to update the same value:
		if (newDescription.trim() === description) return;

		startTransition(async () => {
			await updateTask({ id, description: newDescription });
		});
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!descriptionRef.current) return;
		if (event.key === 'Enter') {
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

	return (
		<p
			ref={descriptionRef}
			contentEditable={!completed}
			className={cn(
				'mt-1 text-neutral-500 outline-none dark:text-neutral-400',
				completed && 'line-through',
				isPending && 'opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Description;
