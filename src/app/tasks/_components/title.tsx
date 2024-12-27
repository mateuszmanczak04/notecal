'use client';

import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
};

const Title = ({ task }: Props) => {
	const { id, title } = task;
	const titleRef = useRef<HTMLParagraphElement>(null!);
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
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
			className={cn('font-bold outline-none transition-colors', isPending && 'pointer-events-none opacity-50')}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Title;
