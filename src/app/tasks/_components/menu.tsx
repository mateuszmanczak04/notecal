'use client';

import { Button } from '@/components/ui/button';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import useTasks from '../_hooks/use-tasks';

interface MenuProps {
	taskId: string;
}

const Menu: FC<MenuProps> = ({ taskId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { remove: removeTask } = useTasks();

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleToggleIsOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	useOnClickOutside(menuRef, handleCloseMenu);

	const handleDelete = () => {
		removeTask(taskId);
		handleCloseMenu();
	};

	return (
		<div className='relative' ref={menuRef}>
			<Button
				size='icon'
				variant='secondary'
				onClick={handleToggleIsOpen}>
				<EllipsisVertical />
			</Button>
			{isOpen && (
				<div className='absolute right-10 top-0 flex flex-col gap-2 rounded-xl border bg-white p-2 shadow-xl'>
					<Button
						variant='destructive'
						className='flex items-center gap-1'
						onClick={handleDelete}>
						<Trash2 />
						Delete
					</Button>
				</div>
			)}
		</div>
	);
};

export default Menu;
