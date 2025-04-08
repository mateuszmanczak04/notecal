import { Calendar, Check, GraduationCap, Settings } from 'lucide-react';
import { NavLink } from 'react-router';
import { cn } from '../../utils/cn';

const MobileNavigation = () => {
	return (
		<div className='grid w-screen grid-cols-4 bg-neutral-100 shadow-2xl lg:hidden dark:bg-neutral-800'>
			<NavLink
				to='/calendar'
				className={({ isActive }) =>
					cn('grid place-content-center p-4', isActive && 'bg-white dark:bg-neutral-900')
				}>
				<Calendar className='h-6 w-6 shrink-0' />
			</NavLink>
			<NavLink
				to='/tasks'
				className={({ isActive }) =>
					cn('grid place-content-center p-4', isActive && 'bg-white dark:bg-neutral-900')
				}>
				<Check className='h-6 w-6 shrink-0' />
			</NavLink>
			<NavLink
				to='/courses'
				className={({ isActive }) =>
					cn('grid place-content-center p-4', isActive && 'bg-white dark:bg-neutral-900')
				}>
				<GraduationCap className='h-6 w-6 shrink-0' />
			</NavLink>
			<NavLink
				to='/settings'
				className={({ isActive }) =>
					cn('grid place-content-center p-4', isActive && 'bg-white dark:bg-neutral-900')
				}>
				<Settings className='h-6 w-6 shrink-0' />
			</NavLink>
		</div>
	);
};

export default MobileNavigation;
