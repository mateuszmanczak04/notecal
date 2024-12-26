'use client';

import { useAppContext } from '@/app/_components/app-context';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useEffect, useRef, useTransition } from 'react';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const Description = ({ task, forPage = 'tasks' }: Props) => {
	const { id, description, completed } = task;
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const [isPending, startTransition] = useTransition();
	const { updateTask } = useAppContext();

	const handleSubmit = () => {
		if (!descriptionRef.current) return;

		const newDescription = descriptionRef.current.innerText;

		// Don't want to update the same value:
		if (newDescription.trim() === description) return;

		startTransition(async () => {
			await updateTask({ id, description: newDescription.trim() });
		});
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

	return (
		<p
			ref={descriptionRef}
			contentEditable
			className={cn(
				' mt-1 text-neutral-500 outline-none dark:text-neutral-400',
				description.trim().length === 0 && 'mb-0 h-4 focus:mb-2 focus:h-auto',
				description.trim().length > 0 && 'mb-2',
				isPending && 'mb-2 h-auto opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Description;
