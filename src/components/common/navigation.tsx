'use client';

import SortTasks from '@/app/tasks/_components/sort-tasks';
import { cn } from '@/lib/utils';
import { Calendar, Check, Cog, List, Menu, Plus, User, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

const Navigation = () => {
	const pathname = usePathname();
	const session = useSession()!;

	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	// It should never happen because this navigation is not shown
	// for unauthenticated users
	if (!session?.data?.user) return;

	return (
		<>
			{/* Open button */}
			<Button
				variant='secondary'
				className={cn(
					'transiton fixed left-0 top-0 z-10 h-full w-12 translate-x-0 rounded-none dark:bg-neutral-900 dark:text-neutral-100 xl:hidden',
					isOpen && '-translate-x-32',
				)}
				aria-label='open menu button'
				title='open menu button'
				onClick={handleOpen}>
				<Menu />
			</Button>
			<div
				className={cn(
					'fixed left-0 top-0 z-40 mr-4 flex h-full w-screen shrink-0 translate-x-0 flex-col gap-8 rounded-xl bg-neutral-100 p-8 pl-20 shadow-lg transition dark:bg-neutral-800 sm:w-96 xl:static xl:max-w-80 xl:p-4 xl:shadow-none',
					!isOpen && '-translate-x-full xl:translate-x-0',
				)}>
				{/* Close button */}
				<Button
					variant='secondary'
					className='transiton fixed left-0 top-0 z-10 h-full w-12 translate-x-0 rounded-none bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 xl:hidden'
					onClick={handleClose}
					aria-label='close menu button'
					title='close menu button'>
					<X />
				</Button>

				{/* Account and settings */}
				<Link
					href='/settings'
					onClick={handleClose}
					className='flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 dark:bg-neutral-700'>
					{/* <Image
							src='/avatar.jpg'
							width={32}
							height={32}
							alt='profile picture'
							className='h-8 w-8 overflow-hidden rounded-full object-cover'
						/> */}
					<User className='h-8 w-8 shrink-0 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800' />
					<div className='overflow-hidden'>
						<p className='truncate text-sm font-medium'>
							{session.data.user.email?.split('@')[0]}
						</p>
						<p className='truncate text-sm opacity-50'>
							{session.data.user.email}
						</p>
					</div>
					<Cog className='h-4 w-4' />
				</Link>

				{/* Main menu */}
				<div>
					<p className='text-sm font-semibold uppercase opacity-50'>
						MAIN MENU
					</p>
					<div className='mt-2'>
						<Link
							href='/calendar'
							className={cn(
								'flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								pathname.includes('/calendar') &&
									'bg-white dark:bg-neutral-700',
							)}
							onClick={handleClose}>
							<Calendar /> Calendar
						</Link>
						<Link
							href='/tasks'
							className={cn(
								'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								pathname.includes('/tasks') &&
									'bg-white dark:bg-neutral-700',
							)}
							onClick={handleClose}>
							<Check /> Tasks
						</Link>
						<Link
							href='/courses'
							className={cn(
								'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								pathname.includes('/courses') &&
									'bg-white dark:bg-neutral-700',
							)}
							onClick={handleClose}>
							<List /> Courses
						</Link>
						<div className='mt-8 flex flex-col gap-2'>
							{pathname === '/courses' && (
								<Button
									asChild
									className='flex w-full items-center justify-center gap-1 font-semibold'
									onClick={handleClose}>
									<Link href='/courses/create'>
										<Plus /> Create a New Course
									</Link>
								</Button>
							)}
							{pathname === '/tasks' && (
								<>
									<Button
										asChild
										className='flex w-full items-center justify-center gap-1 font-semibold'
										onClick={handleClose}>
										<Link href='/tasks/create'>
											<Plus />
											Create a New Task
										</Link>
									</Button>
									<SortTasks closeNavigation={handleClose} />
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
