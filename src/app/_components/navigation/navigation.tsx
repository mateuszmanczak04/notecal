'use client';

import { Button } from '@/components/button';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/utils/cn';
import { Calendar, Check, Menu, Settings, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NavCourses from './nav-courses';

const Navigation = () => {
	const pathname = usePathname();
	const { data: user } = useUser();
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Open button */}
			<Button
				variant='secondary'
				className={cn(
					'transiton fixed left-0 top-0 z-50 h-full w-12 translate-x-0 rounded-none xl:hidden dark:bg-neutral-900 dark:text-neutral-100',
					isOpen && '-translate-x-32',
				)}
				aria-label='open menu button'
				title='open menu button'
				onClick={handleOpen}>
				<Menu />
			</Button>
			<div
				className={cn(
					'fixed left-0 top-0 z-[999] mr-4 flex h-screen w-screen shrink-0 translate-x-0 flex-col gap-8 bg-neutral-100 p-8 pl-20 shadow-lg transition sm:w-96 xl:max-w-80 xl:p-6 xl:shadow-none dark:bg-neutral-900',
					!isOpen && '-translate-x-full xl:translate-x-0',
				)}>
				{/* Close button */}
				<Button
					variant='secondary'
					className='transiton fixed left-0 top-0 z-10 h-full w-12 translate-x-0 rounded-none bg-neutral-200 xl:hidden dark:bg-neutral-800 dark:text-neutral-100'
					onClick={handleClose}
					aria-label='close menu button'
					title='close menu button'>
					<X />
				</Button>

				{/* Account and settings */}
				<Link
					prefetch
					href='/settings'
					onClick={handleClose}
					className='flex select-none items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 dark:bg-neutral-700'>
					{/* <Image
							src='/avatar.jpg'
							width={32}
							height={32}
							alt='profile picture'
							className='h-8 w-8 overflow-hidden rounded-full object-cover'
						/> */}
					<User className='h-8 w-8 shrink-0 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800' />
					<div className='overflow-hidden'>
						<p className='truncate text-sm font-medium'>{user?.email}</p>
					</div>
					<Settings className='h-6 w-6 shrink-0' />
				</Link>

				{/* Main menu */}
				<div>
					<p className='text-sm font-semibold uppercase opacity-50'>MENU</p>
					<div className='mt-2'>
						<Link
							prefetch
							href='/calendar'
							className={cn(
								'flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								pathname.includes('/calendar') && 'bg-white dark:bg-neutral-700',
							)}
							onClick={handleClose}>
							<Calendar className='h-4 w-4' /> Calendar
						</Link>
						<Link
							prefetch
							href='/tasks'
							className={cn(
								'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								pathname.includes('/tasks') && 'bg-white dark:bg-neutral-700',
							)}
							onClick={handleClose}>
							<Check className='h-4 w-4' /> Tasks
						</Link>
						<NavCourses closeNavigation={handleClose} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
