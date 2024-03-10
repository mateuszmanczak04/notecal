import Link from 'next/link';
import { FC } from 'react';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
	return (
		<div>
			<div className='flex justify-between items-center w-full p-4 bg-gray-100'>
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
