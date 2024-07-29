'use client';

import { cn } from '@/lib/utils';
import { TaskPriority } from '@prisma/client';
import { FC, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import useTasks from '../_hooks/use-tasks';
import Tag from './tag';

interface PriorityProps {
	id: string;
	priority: TaskPriority | null;
}

const getPriorityName = (priority: TaskPriority | null) => {
	if (priority === 'A') return 'High';
	if (priority === 'B') return 'Medium';
	if (priority === 'C') return 'Low';
	return 'No priority';
};

const Priority: FC<PriorityProps> = ({ id, priority }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { update: updateTask } = useTasks();

	const handleSaveChange = (newPriority: TaskPriority | null) => {
		if (priority && newPriority === priority) return;

		updateTask({
			id,
			priority: newPriority,
		});
	};

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	const handleToggleMenu = () => {
		if (isOpen) {
			handleCloseMenu();
		} else {
			handleOpenMenu();
		}
	};

	useOnClickOutside(menuRef, () => {
		handleCloseMenu();
	});

	return (
		<div className='relative' ref={menuRef}>
			<Tag
				text={getPriorityName(priority)}
				onClick={handleToggleMenu}
				className={cn(
					'transition',
					priority === 'A' && 'bg-red-100 text-red-500 hover:bg-red-200',
					priority === 'B' &&
						'bg-yellow-100 text-yellow-500 hover:bg-yellow-200',
					priority === 'C' && 'bg-green-100 text-green-500 hover:bg-green-200',
				)}
			/>
			{isOpen && (
				<div className='absolute left-0 top-7 z-20 flex w-fit flex-col items-center justify-center rounded-md border bg-white shadow-xl'>
					<button
						className='flex h-8 w-full cursor-pointer select-none items-center justify-center text-nowrap px-4 transition hover:bg-neutral-100'
						onClick={() => {
							handleSaveChange(null);
							handleCloseMenu();
						}}>
						No priority
					</button>
					{(['A', 'B', 'C'] as TaskPriority[]).map(priority => (
						<button
							className={cn(
								'flex h-8 w-full cursor-pointer select-none items-center justify-center  px-4 transition hover:bg-neutral-100',
								priority === 'A' && 'text-red-500',
								priority === 'B' && 'text-yellow-500',
								priority === 'C' && 'text-green-500',
							)}
							key={priority}
							onClick={() => {
								handleSaveChange(priority);
								handleCloseMenu();
							}}>
							{getPriorityName(priority)}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Priority;
