'use client';

import { cn } from '@/lib/utils';
import React, { FC, useEffect, useRef, useTransition } from 'react';
import updateTask from '../_actions/update-task';
import LocalTasks from '@/lib/local-tasks';

interface DescriptionProps {
	id: string;
	description: string;
	completed: boolean;
}

const Description: FC<DescriptionProps> = ({ id, description, completed }) => {
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		if (!descriptionRef.current) return;
		const newDescription = descriptionRef.current.innerText;

		// Don't want to update the same value:
		if (newDescription === description) return;

		startTransition(async () => {
			updateTask({ id, description: newDescription }); // TODO: optimistic updates
			await LocalTasks.update(id, {
				description: newDescription.trim(),
			});
		});
	};

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
				'mt-1 text-neutral-500 outline-none',
				completed && 'line-through',
				isPending && 'opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}></p>
	);
};

export default Description;
