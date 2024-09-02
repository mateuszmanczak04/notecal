'use client';

import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import React, { useEffect, useRef } from 'react';
import useTasks from '../_hooks/use-tasks';
import useTasksHistory from '../_hooks/use-tasks-history';

type Props = {
	task: Task;
};

const Title = ({ task }: Props) => {
	const { id, title, completed } = task;
	const titleRef = useRef<HTMLParagraphElement | null>(null);
	const { update: updateTask, remove: removeTask } = useTasks();
	const { makeUpdate } = useTasksHistory(); // Cmd + Z

	const handleSubmit = () => {
		if (!titleRef.current) return;
		const newTitle = titleRef.current.innerText;

		// Mechanic of this is that we remove the task when title is empty
		if (newTitle.length === 0) {
			removeTask(id);

			makeUpdate({
				type: 'delete',
				...task,
			});
		}

		// Don't want to update the same value:
		if (newTitle.trim() === title) return;

		updateTask({ id, title: newTitle });
		makeUpdate({
			type: 'update',
			id: task.id,
			property: 'title',
			oldValue: task.title,
			newValue: newTitle,
		});
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
