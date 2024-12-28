'use client';

import updateSettings from '@/app/settings/_actions/update-settings';
import { Button } from '@/components/button';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowUpDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const SortTasks = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null!);
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: updateSettings,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['user'] });
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

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

	const handleSort = (newCriteria: string) => {
		if (
			newCriteria &&
			(newCriteria === 'title' ||
				newCriteria === 'createdAt' ||
				newCriteria === 'dueDate' ||
				newCriteria === 'priority' ||
				newCriteria === 'completed')
		) {
			mutate({ orderTasks: newCriteria });
		}
	};
	return (
		<div className={cn('relative flex-1', isPending && 'opacity-50')} ref={menuRef}>
			<Button variant='secondary' onClick={handleToggleMenu} className='w-full'>
				<ArrowUpDown />
				Order by
			</Button>
			{isOpen && (
				<div className='absolute left-0 top-8 z-20 flex w-full select-none flex-col items-stretch justify-center rounded-b-md border bg-white shadow-xl dark:bg-neutral-800 dark:text-white'>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-700'
						onClick={() => {
							handleSort('title');
							handleCloseMenu();
						}}>
						Title
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-700'
						onClick={() => {
							handleSort('createdAt');
							handleCloseMenu();
						}}>
						Newest first
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-700'
						onClick={() => {
							handleSort('dueDate');
							handleCloseMenu();
						}}>
						Due date
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-700'
						onClick={() => {
							handleSort('priority');
							handleCloseMenu();
						}}>
						Priority
					</div>
					<div
						className='flex h-8 cursor-pointer items-center justify-center gap-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
