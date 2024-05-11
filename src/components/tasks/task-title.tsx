'use client';

import { updateTaskName } from '@/actions/tasks/update-task-name';
import { Input } from '@/components/ui/input';
import { updateTaskTitle as updateTaskTitleLocal } from '@/lib/update-task';
import { FC, useRef, useState, useTransition } from 'react';

interface TaskTitleProps {
	id: string;
	title: string;
}

const TaskTitle: FC<TaskTitleProps> = ({ id, title: initialTitle }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(initialTitle);
	const [titleBeforeEditing, setTitleBeforeEditing] =
		useState<string>(initialTitle);
	const [isPending, startTransition] = useTransition();
	const inputRef = useRef<HTMLInputElement>(null);

	// todo - add error handling and use of useOptimistic
	const submit = () => {
		if (title && title.length > 0 && title !== titleBeforeEditing) {
			startTransition(() => {
				updateTaskName({ id, newTitle: title });
				updateTaskTitleLocal(id, title);
				setIsEditing(false);
			});
		} else {
			setTitle(titleBeforeEditing);
			setIsEditing(false);
		}
	};

	const onFocus = () => {
		setIsEditing(true);
		setTitleBeforeEditing(title);
		setTimeout(() => {
			if (inputRef?.current) {
				inputRef.current.focus();
			}
		}, 10);
	};

	// on clicking outside
	const onBlur = () => {
		setIsEditing(false);
		submit();
	};

	const onCancel = () => {
		setTitle(titleBeforeEditing);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				className='h-8 rounded-none border-none bg-accent px-0 py-0 text-base font-semibold shadow-none outline-none ring-0 focus:border-none focus:outline-none focus-visible:ring-0'
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={onBlur}
				onKeyDown={e => {
					if (e.key === 'Enter') submit();
					else if (e.key === 'Escape') onCancel();
				}}
			/>
		);
	}

	return (
		<p
			className='flex h-8 w-full items-center gap-2 truncate font-semibold'
			onClick={onFocus}>
			{title}
		</p>
	);
};

export default TaskTitle;
