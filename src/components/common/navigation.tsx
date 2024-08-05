'use client';

import SortTasks from '@/app/tasks/_components/sort-tasks';
import { cn } from '@/lib/utils';
import { Calendar, Check, Cog, List, Menu, Plus, User, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const Navigation = () => {
	const pathname = usePathname();
	const session = useSession();

	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Button
				variant='secondary'
				className={cn(
					'transiton fixed left-0 top-0 z-10 h-full w-12 translate-x-0 rounded-none xl:hidden',
					isOpen && '-translate-x-32',
				)}
				onClick={handleOpen}>
				<Menu />
			</Button>
			<div
				className={cn(
					'fixed left-0 top-0 z-40 mr-4 flex h-full w-screen shrink-0 translate-x-0 flex-col gap-8 bg-neutral-100 p-8 pl-20 shadow-xl transition sm:w-96 xl:static xl:max-w-80 xl:p-4 xl:shadow-none',
					!isOpen && '-translate-x-full xl:translate-x-0',
				)}>
				<Button
					variant='secondary'
					className='transiton fixed left-0 top-0 z-10 h-full w-12 translate-x-0 rounded-none bg-neutral-200 xl:hidden'
					onClick={handleClose}>
					<X />
				</Button>
				{/* Account and settings: */}
				{session?.data?.user ? (
					<Link
						href='/settings'
						onClick={handleClose}
						className='flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2'>
						{/* <Image
							src='/avatar.jpg'
							width={32}
							height={32}
							alt='profile picture'
							className='h-8 w-8 overflow-hidden rounded-full object-cover'
						/> */}
						<User className='h-8 w-8 shrink-0 rounded-full bg-neutral-100 p-1' />
						<div className='overflow-hidden'>
							<p className='truncate text-sm font-bold'>
								{session.data.user.email?.split('@')[0]}
							</p>
							<p className='truncate text-sm text-gray-500'>
								{session.data.user.email}
							</p>
						</div>

						<Cog className='shrin h-4 w-4' />
					</Link>
				) : (
					<Skeleton className='h-12 w-full bg-white' />
				)}
				{/* Main menu: */}
				<div>
					<p className='text-sm font-semibold uppercase text-gray-500'>
						MAIN MENU
					</p>
					<div className='mt-2'>
						<Link
							href='/calendar'
							className={cn(
								'flex items-center gap-2 rounded-sm p-2 font-semibold',
								pathname.includes('/calendar') && 'bg-white',
							)}
							onClick={handleClose}>
							<Calendar className='h-4 w-4' /> Calendar
						</Link>
						<Link
							href='/tasks'
							className={cn(
								'mt-2 flex items-center gap-2 rounded-sm p-2 font-semibold',
								pathname.includes('/tasks') && 'bg-white',
							)}
							onClick={handleClose}>
							<Check className='h-4 w-4' /> Tasks
						</Link>
						<Link
							href='/courses'
							className={cn(
								'mt-2 flex items-center gap-2 rounded-sm p-2 font-semibold',
								pathname.includes('/courses') && 'bg-white',
							)}
							onClick={handleClose}>
							<List className='h-4 w-4' /> Courses
						</Link>
						<div className='mt-8 flex flex-col gap-2'>
							{pathname === '/courses' && (
								<Button
									asChild
									size='sm'
									className='flex w-full items-center justify-center gap-1 font-semibold'
									onClick={handleClose}>
									<Link href='/courses/create'>
										<Plus className='h-6 w-6' /> Create a New Course
									</Link>
								</Button>
							)}
							{pathname === '/tasks' && (
								<>
									<Button
										asChild
										size='sm'
										className='flex w-full items-center justify-center gap-1 font-semibold'
										onClick={handleClose}>
										<Link href='/tasks/create'>
											<Plus className='h-4 w-4' /> Create a New Task
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
