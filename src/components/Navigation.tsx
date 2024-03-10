'use client';

import cn from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen(!open);
		console.log(!open);
	};

	return (
		<>
			<div className='fixed left-0 top-0 z-50 flex h-16 w-screen items-center justify-between bg-pink-700 p-4 text-white sm:hidden'>
				<Link href='/' className='text-2xl font-semibold'>
					NoteCal
				</Link>
				<button className='text-3xl' onClick={toggleOpen}>
					☰
				</button>
				{open && (
					<div className='absolute left-0 top-16 -z-10 flex w-screen flex-col gap-2 overflow-hidden bg-gray-200 p-2 text-black shadow-2xl'>
						<Link
							href='/calendar'
							className='w-full rounded-md bg-gray-100 p-4 text-lg font-semibold'
							onClick={toggleOpen}>
							Calendar
						</Link>
						<Link
							href='/tasks'
							className='w-full rounded-md bg-gray-100 p-4 text-lg font-semibold'
							onClick={toggleOpen}>
							Tasks
						</Link>
						<Link
							href='/courses'
							className='w-full rounded-md bg-gray-100 p-4 text-lg font-semibold'
							onClick={toggleOpen}>
							Courses
						</Link>
					</div>
				)}
			</div>
			<div className='fixed left-0 top-0 z-50 hidden h-16 w-screen items-center justify-between bg-pink-700 p-4 text-white sm:flex'>
				<Link href='/' className='text-2xl font-bold'>
					NoteCal
				</Link>
				<div className='flex space-x-4'>
					<Link href='/calendar' className='text-lg font-semibold'>
						Calendar
					</Link>
					<Link href='/tasks' className='text-lg font-semibold'>
						Tasks
					</Link>
					<Link href='/courses' className='text-lg font-semibold'>
						Courses
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navigation;
