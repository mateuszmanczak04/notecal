'use client';

import { cn } from '@/lib/utils';
import { Calendar, Check, Cog, List, Plus, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

const Navigation = () => {
	const pathname = usePathname();
	const session = useSession();

	// mobile is not supported yet

	return (
		<div className='mr-4 flex h-full w-80 shrink-0 flex-col gap-8 p-4'>
			{/* Account and settings: */}
			{session?.data?.user ? (
				<Link
					href='/settings'
					className='flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2'>
					<div className='flex items-center gap-3'>
						{/* <Image
							src='/avatar.jpg'
							width={32}
							height={32}
							alt='profile picture'
							className='h-8 w-8 overflow-hidden rounded-full object-cover'
						/> */}
						<User className='h-8 w-8 rounded-full bg-neutral-100 p-1' />
						<div className='overflow-hidden'>
							<p className='truncate text-sm font-bold'>
								{session.data.user.email?.split('@')[0]}
							</p>
							<p className='truncate text-sm text-gray-500'>
								{session.data.user.email}
							</p>
						</div>
					</div>
					<Cog className='h-4 w-4' />
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
						)}>
						<Calendar className='h-4 w-4' /> Calendar
					</Link>
					<Link
						href='/tasks'
						className={cn(
							'mt-2 flex items-center gap-2 rounded-sm p-2 font-semibold',
							pathname.includes('/tasks') && 'bg-white',
						)}>
						<Check className='h-4 w-4' /> Tasks
					</Link>
					<Link
						href='/courses'
						className={cn(
							'mt-2 flex items-center gap-2 rounded-sm p-2 font-semibold',
							pathname.includes('/courses') && 'bg-white',
						)}>
						<List className='h-4 w-4' /> Courses
					</Link>
					<div className='mt-8'>
						{pathname.includes('/courses') && (
							<Button
								asChild
								size='sm'
								className='flex w-full items-center justify-center gap-1 font-semibold'>
								<Link href='/courses/create'>
									<Plus className='h-6 w-6' /> Create a New Course
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
