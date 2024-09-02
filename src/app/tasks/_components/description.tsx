'use client';

import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import React, { useEffect, useRef } from 'react';
import useTasks from '../_hooks/use-tasks';
import useTasksHistory from '../_hooks/use-tasks-history';

type Props = {
	task: Task;
};

const Description = ({ task }: Props) => {
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const { update: updateTask } = useTasks();
	const { makeUpdate } = useTasksHistory(); // Cmd + Z

	const handleSubmit = () => {
		if (!descriptionRef.current) return;
		const newDescription = descriptionRef.current.innerText;

		// Don't want to update the same value:
		if (newDescription.trim() === task.description) return;

		updateTask({ id: task.id, description: newDescription.trim() });
		makeUpdate({
			type: 'update',
			property: 'description',
			id: task.id,
			oldValue: task.description,
			newValue: newDescription.trim(),
		});
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
			descriptionRef.current.innerText = task.description;
			descriptionRef.current.blur();
			return;
		}
	};

	// Set initial description:
	useEffect(() => {
		if (!descriptionRef.current) return;
		descriptionRef.current.innerText = task.description;
	}, [task.description]);

	return (
		<p
			ref={descriptionRef}
			contentEditable={!task.completed}
			className={cn(
				'mt-1 text-neutral-500 outline-none dark:text-neutral-400',
				task.completed && 'line-through',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Description;
