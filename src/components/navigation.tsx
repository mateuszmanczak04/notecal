'use client';

import { cn } from '@/lib/utils';
import { Calendar, Check, Cog, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
	const pathname = usePathname();

	/* mobile not supported yet */
	/* tablet and desktop: */
	return (
		<div className='flex w-80 shrink-0 flex-col gap-8 bg-gray-100 p-4'>
			{/* Account and settings: */}
			<Link
				href='/settings'
				className='flex items-center justify-between rounded-xl bg-white px-4 py-2'>
				<div className='flex items-center gap-3'>
					<Image
						src='/avatar.jpg'
						width={32}
						height={32}
						alt='profile picture'
						className='h-8 w-8 rounded-lg bg-gray-900 object-cover'
					/>
					<div>
						<p className='font-bold'>John Doe</p>
						<p className='text-gray-500'>johndoe@example.com</p>
					</div>
				</div>
				<Cog className='h-4 w-4' />
			</Link>
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
				</div>
			</div>
		</div>
	);
};

export default Navigation;
