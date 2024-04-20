'use client';

import { updateTaskDescription } from '@/actions/update-task-description';
import { Input } from '@/components/ui/input';
import { FC, useRef, useState, useTransition } from 'react';

interface TaskTitleProps {
	id: string;
	description: string;
}

const TaskDescription: FC<TaskTitleProps> = ({
	id,
	description: initialDescription,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [description, setDescription] = useState<string>(initialDescription);
	const [descriptionBeforeEditing, setDescriptionBeforeEditing] =
		useState<string>(initialDescription);
	const [isPending, startTransition] = useTransition();
	const inputRef = useRef<HTMLInputElement>(null);

	// todo - add error handling and use of useOptimistic
	const submit = () => {
		startTransition(() => {
			updateTaskDescription({ id, newDescription: description });
			setIsEditing(false);
		});
	};

	const onFocus = () => {
		setIsEditing(true);
		setDescriptionBeforeEditing(description);
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
		setDescription(descriptionBeforeEditing);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				className='h-6 rounded-none border-none bg-accent px-0 py-0 text-sm shadow-none outline-none ring-0 focus:border-none focus:outline-none focus-visible:ring-0'
				value={description}
				onChange={e => setDescription(e.target.value)}
				onBlur={onBlur}
				onKeyDown={e => {
					if (e.key === 'Enter') submit();
					else if (e.key === 'Escape') onCancel();
				}}
			/>
		);
	}

	if (description && description.length > 0) {
		return (
			<p className='flex h-6 items-center gap-2 text-sm' onClick={onFocus}>
				{description}
			</p>
		);
	}

	return (
		<p
			className='flex h-6 items-center gap-2 text-sm text-muted-foreground'
			onClick={onFocus}>
			No description
		</p>
	);
};

export default TaskDescription;
