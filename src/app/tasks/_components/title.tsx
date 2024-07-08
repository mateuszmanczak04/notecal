'use client';

import { cn } from '@/lib/utils';
import React, {
	FC,
	useCallback,
	useEffect,
	useRef,
	useTransition,
} from 'react';
import updateTask from '../_actions/update-task';
import LocalTasks from '@/lib/local-tasks';

interface TitleProps {
	id: string;
	title: string;
	completed: boolean;
}

const Title: FC<TitleProps> = ({ id, title, completed }) => {
	const titleRef = useRef<HTMLParagraphElement | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		if (!titleRef.current) return;
		const newTitle = titleRef.current.innerText;

		// Don't want to update the same value:
		if (newTitle === title) return;

		startTransition(async () => {
			updateTask({ id, title: newTitle }); // TODO: optimistic updates
			await LocalTasks.update(id, { title: newTitle });
		});
	};

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
				'font-bold outline-none',
				completed && 'line-through',
				isPending && 'opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}></p>
	);
};

export default Title;
