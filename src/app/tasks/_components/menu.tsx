'use client';

import { Button } from '@/components/ui/button';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { FC, useRef, useState, useTransition } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import deleteTask from '../_actions/delete-task';
import { Task } from '@prisma/client';
import queryClient from '@/lib/query-client';

interface MenuProps {
	taskId: string;
}

const Menu: FC<MenuProps> = ({ taskId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [_, startTransition] = useTransition();

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleToggleIsOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	useOnClickOutside(menuRef, handleCloseMenu);

	const handleDelete = () => {
		startTransition(() => {
			deleteTask({ id: taskId });

			// Delete task also from local cache:
			queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
				const oldTasks = old.tasks;
				return {
					tasks: oldTasks.filter(task => task.id !== taskId),
				};
			});
		});
		handleCloseMenu();
	};

	return (
		<div className='relative' ref={menuRef}>
			<Button size='icon' variant='secondary' onClick={handleToggleIsOpen}>
				<EllipsisVertical className='h-6 w-6' />
			</Button>
			{isOpen && (
				<div className='absolute right-10 top-0 flex flex-col gap-2 rounded-xl border bg-white p-2 shadow-xl'>
					<Button
						variant='destructive'
						className='flex items-center gap-1'
						onClick={handleDelete}>
						<Trash2 className='h-4 w-4' />
						Delete
					</Button>
				</div>
			)}
		</div>
	);
};

export default Menu;
