'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import { Input } from '@/components/ui/input';
import LocalTasks from '@/lib/local-tasks';
import { FC, useRef, useState, useTransition } from 'react';

interface TaskTitleProps {
	id: string;
	description: string;
}

const Description: FC<TaskTitleProps> = ({
	id,
	description: initialDescription,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [description, setDescription] = useState<string>(initialDescription);
	const [descriptionBeforeEditing, setDescriptionBeforeEditing] =
		useState<string>(initialDescription);
	const [isPending, startTransition] = useTransition();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (description !== descriptionBeforeEditing) {
			startTransition(async () => {
				// TODO: optimistic updates
				updateTask({ id, description });
				await LocalTasks.update(id, { description });
				setIsEditing(false);
			});
		}
	};

	const handleFocus = () => {
		setIsEditing(true);
		setDescriptionBeforeEditing(description);
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
		setDescription(descriptionBeforeEditing);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				className='bg-accent h-6 rounded-none border-none px-0 py-0 text-sm shadow-none outline-none ring-0 focus:border-none focus:outline-none focus-visible:ring-0'
				value={description}
				onChange={e => setDescription(e.target.value)}
				onBlur={handleBlur}
				onKeyDown={e => {
					if (e.key === 'Enter') handleSubmit();
					else if (e.key === 'Escape') handleCancel();
				}}
			/>
		);
	}

	if (description && description.length > 0) {
		return (
			<p
				className='flex h-6 items-center gap-2 truncate text-sm'
				onClick={handleFocus}>
				{description}
			</p>
		);
	}

	return (
		<p
			className='text-muted-foreground flex h-6 items-center gap-2 truncate text-sm'
			onClick={handleFocus}>
			No description
		</p>
	);
};

export default Description;
