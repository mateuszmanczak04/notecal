import Link from 'next/link';
import { FC } from 'react';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
	return (
		<div>
			<div className='w-scren fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-gray-100 p-4'>
				<Link href='/' className='text-2xl font-semibold'>
					NoteCal
				</Link>
				<div className='flex space-x-4'>
					<Link href='/calendar' className='text-lg font-medium'>
						Calendar
					</Link>
					<Link href='/tasks' className='text-lg font-medium'>
						Tasks
					</Link>
					<Link href='/courses' className='text-lg font-medium'>
						Courses
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
