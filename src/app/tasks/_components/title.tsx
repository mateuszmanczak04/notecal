'use client';

import { cn } from '@/lib/utils';
import React, { FC, useEffect, useRef } from 'react';
import useTasks from '../_hooks/use-tasks';

interface TitleProps {
	id: string;
	title: string;
	completed: boolean;
}

const Title: FC<TitleProps> = ({ id, title, completed }) => {
	const titleRef = useRef<HTMLParagraphElement | null>(null);
	const { update: updateTask } = useTasks();

	const handleSubmit = () => {
		if (!titleRef.current) return;
		const newTitle = titleRef.current.innerText;

		// Don't want to update the same value:
		if (newTitle.trim() === title) return;

		updateTask({ id, title: newTitle });
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLParagraphElement>,
	) => {
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
				'font-bold outline-none',
				completed && 'line-through',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default Title;
