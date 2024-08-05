'use client';

import useSettings from '@/app/settings/_hooks/use-settings';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const SortTasks = ({ closeNavigation }: { closeNavigation: () => void }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { update: updateSettings } = useSettings();

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

	const handleSort = (value: string) => {
		if (
			value &&
			(value === 'title' ||
				value === 'createdAt' ||
				value === 'dueDate' ||
				value === 'priority' ||
				value === 'completed')
		) {
			updateSettings({ orderTasks: value });
			closeNavigation();
			// TODO: sort tasks
		}
	};

	return (
		<div className='relative flex-1' ref={menuRef}>
			<Button
				variant='secondary'
				size='sm'
				onClick={handleToggleMenu}
				className='w-full gap-1 transition'>
				<ArrowUpDown className='h-4 w-4' />
				Order By
			</Button>
			{isOpen && (
				<div className='absolute left-0 top-8 z-20 flex w-full select-none flex-col items-stretch justify-center rounded-b-md border bg-white shadow-xl'>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
						onClick={() => {
							handleSort('title');
							handleCloseMenu();
						}}>
						Title
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
						onClick={() => {
							handleSort('createdAt');
							handleCloseMenu();
						}}>
						Newest first
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
						onClick={() => {
							handleSort('dueDate');
							handleCloseMenu();
						}}>
						Due date
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
						onClick={() => {
							handleSort('priority');
							handleCloseMenu();
						}}>
						Priority
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100'
						onClick={() => {
							handleSort('completed');
							handleCloseMenu();
						}}>
						Completed first
					</div>
				</div>
			)}
		</div>
	);
};

export default SortTasks;
