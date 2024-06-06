'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NavAuthenticated = () => {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			{/* mobile */}
			<div className='fixed left-0 top-0 z-50 flex h-16 w-screen items-center justify-between bg-primary p-4 text-white sm:hidden'>
				<Link href='/' className='text-2xl font-semibold'>
					NoteCal
				</Link>
				<Button onClick={toggleOpen} className='shadow-none'>
					<Menu className='h-8 w-8' />
				</Button>
				{open && (
					<div className='absolute left-0 top-16 -z-10 flex w-screen flex-col gap-2 overflow-hidden border-b-2 border-white/20 bg-background p-2 shadow-2xl'>
						<Button
							asChild
							variant='secondary'
							className='w-full bg-primary/10 text-center leading-10 hover:bg-primary/15 dark:bg-white/10 dark:hover:bg-white/15'>
							<Link href='/calendar' onClick={toggleOpen}>
								Calendar
							</Link>
						</Button>
						<Button
							asChild
							variant='secondary'
							className='w-full bg-primary/10 text-center leading-10 hover:bg-primary/15 dark:bg-white/10 dark:hover:bg-white/15'>
							<Link href='/tasks' onClick={toggleOpen}>
								Tasks
							</Link>
						</Button>
						<Button
							asChild
							variant='secondary'
							className='w-full bg-primary/10 text-center leading-10 hover:bg-primary/15 dark:bg-white/10 dark:hover:bg-white/15'>
							<Link href='/courses' onClick={toggleOpen}>
								Courses
							</Link>
						</Button>
						<Button
							asChild
							variant='secondary'
							className='w-full bg-primary/10 text-center leading-10 hover:bg-primary/15 dark:bg-white/10 dark:hover:bg-white/15'>
							<Link href='/settings' onClick={toggleOpen}>
								Settings
							</Link>
						</Button>
					</div>
				)}
			</div>
			{/* tablet and desktop: */}
			<div className='fixed left-0 top-0 z-50 hidden h-16 w-screen items-center justify-between bg-primary p-4 text-white sm:flex'>
				<Link href='/' className='tsext-2xl font-bold'>
					NoteCal
				</Link>
				<div className='flex items-center gap-2'>
					<Button asChild className='leading-10 shadow-none'>
						<Link href='/calendar'>Calendar</Link>
					</Button>
					<Button asChild className='leading-10 shadow-none'>
						<Link href='/tasks'>Tasks</Link>
					</Button>
					<Button asChild className='leading-10 shadow-none'>
						<Link href='/courses'>Courses</Link>
					</Button>
					<Button asChild className='leading-10 shadow-none'>
						<Link href='/settings'>Settings</Link>
					</Button>
				</div>
			</div>
		</>
	);
};

export default NavAuthenticated;
