'use client';

import updateSettings from '@/app/settings/_actions/update-settings';
import { Button } from '@/components/ui/button';
import sortTasks from '@/lib/sort-tasks';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { BeatLoader } from 'react-spinners';
import { useOnClickOutside } from 'usehooks-ts';

const SortTasks = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
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
			startTransition(() => {
				updateSettings({ orderTasks: value });
				sortTasks(value);
			});
		}
	};

	return (
		<div className='relative flex-1'>
			<Button
				variant='secondary'
				size='lg'
				onClick={handleOpenMenu}
				className={cn('w-full transition', isPending && 'opacity-50')}>
				<ArrowUpDown className='h-5 w-5' />
				Order By
			</Button>
			{isOpen && (
				<div
					ref={menuRef}
					className='absolute left-0 top-11 z-20 flex w-full select-none flex-col items-stretch justify-center rounded-md border bg-white shadow-xl'>
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
