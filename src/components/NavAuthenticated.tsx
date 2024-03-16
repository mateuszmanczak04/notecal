'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button, { buttonVariants } from './Button';
import { Menu } from 'lucide-react';
import SignOut from '@/app/auth/SignOut';

const NavAuthenticated = () => {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className='fixed left-0 top-0 z-50 flex h-16 w-screen items-center justify-between bg-primary p-4 text-white sm:hidden'>
				<Link href='/' className='text-2xl font-semibold'>
					NoteCal
				</Link>
				<Button onClick={toggleOpen}>
					<Menu className='h-8 w-8' />
				</Button>
				{open && (
					<div className='absolute left-0 top-16 -z-10 flex w-screen flex-col gap-2 overflow-hidden bg-gray-200 p-2 text-black shadow-2xl'>
						<Link
							href='/calendar'
							className={buttonVariants({
								variant: 'secondary',
								size: 'medium',
								className:
									'w-full bg-gray-50 text-center leading-10 hover:bg-gray-100',
							})}
							onClick={toggleOpen}>
							Calendar
						</Link>
						<Link
							href='/tasks'
							className={buttonVariants({
								variant: 'secondary',
								size: 'medium',
								className:
									'w-full bg-gray-50 text-center leading-10 hover:bg-gray-100',
							})}
							onClick={toggleOpen}>
							Tasks
						</Link>
						<Link
							href='/courses'
							className={buttonVariants({
								variant: 'secondary',
								size: 'medium',
								className:
									'w-full bg-gray-50 text-center leading-10 hover:bg-gray-100',
							})}
							onClick={toggleOpen}>
							Courses
						</Link>
						<SignOut variant='primary' />
					</div>
				)}
			</div>
			<div className='fixed left-0 top-0 z-50 hidden h-16 w-screen items-center justify-between bg-primary p-4 text-white sm:flex'>
				<Link href='/' className='text-2xl font-bold'>
					NoteCal
				</Link>
				<div className='flex items-center gap-2'>
					<Link
						href='/calendar'
						className={buttonVariants({
							variant: 'primary',
							size: 'medium',
							className: 'leading-10',
						})}>
						Calendar
					</Link>
					<Link
						href='/tasks'
						className={buttonVariants({
							variant: 'primary',
							size: 'medium',
							className: 'leading-10',
						})}>
						Tasks
					</Link>
					<Link
						href='/courses'
						className={buttonVariants({
							variant: 'primary',
							size: 'medium',
							className: 'leading-10',
						})}>
						Courses
					</Link>
					<SignOut variant='secondary' />
				</div>
			</div>
		</>
	);
};

export default NavAuthenticated;
