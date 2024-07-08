'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import { Input } from '@/components/ui/input';
import LocalTasks from '@/lib/local-tasks';
import { FC, useRef, useState, useTransition } from 'react';

interface TaskTitleProps {
	id: string;
	title: string;
}

const Title: FC<TaskTitleProps> = ({ id, title: initialTitle }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(initialTitle);
	const [titleBeforeEditing, setTitleBeforeEditing] =
		useState<string>(initialTitle);
	const [isPending, startTransition] = useTransition();
	const inputRef = useRef<HTMLInputElement>(null);

	// todo - add error handling and use of useOptimistic
	const handleSubmit = () => {
		if (title && title.length > 0 && title !== titleBeforeEditing) {
			startTransition(async () => {
				// TODO: optimistic updates
				updateTask({ id, title });
				await LocalTasks.update(id, { title });

				setIsEditing(false);
			});
		} else {
			setTitle(titleBeforeEditing);
			setIsEditing(false);
		}
	};

	const handleFocus = () => {
		setIsEditing(true);
		setTitleBeforeEditing(title);
		setTimeout(() => {
			if (inputRef?.current) {
				inputRef.current.focus();
			}
		}, 10);
	};

	// on clicking outside
	const handleBlur = () => {
		setIsEditing(false);
		handleSubmit();
	};

	const handleCancel = () => {
		setTitle(titleBeforeEditing);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				className='h-8 rounded-none border-none px-0 py-0 text-base font-semibold shadow-none outline-none ring-0 focus:border-none focus:outline-none focus-visible:ring-0'
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={handleBlur}
				onKeyDown={e => {
					if (e.key === 'Enter') handleSubmit();
					else if (e.key === 'Escape') handleCancel();
				}}
			/>
		);
	}

	return (
		<p
			className='flex h-8 w-full items-center gap-2 truncate font-semibold'
			onClick={handleFocus}>
			{title}
		</p>
	);
};

export default Title;
