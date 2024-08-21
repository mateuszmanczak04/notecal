'use client';

import { cn } from '@/lib/utils';
import React, { FC, useEffect, useRef } from 'react';
import useTasks from '../_hooks/use-tasks';

interface DescriptionProps {
	id: string;
	description: string;
	completed: boolean;
}

const Description: FC<DescriptionProps> = ({ id, description, completed }) => {
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const { update: updateTask } = useTasks();

	const handleSubmit = () => {
		if (!descriptionRef.current) return;
		const newDescription = descriptionRef.current.innerText;

		// Don't want to update the same value:
		if (newDescription.trim() === description) return;

		updateTask({ id, description: newDescription.trim() });
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLParagraphElement>,
	) => {
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
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Description;
