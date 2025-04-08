import { Calendar, Check, GraduationCap, Settings } from 'lucide-react';
import { NavLink } from 'react-router';

const MobileNavigation = () => {
	return (
		<div className='grid w-screen grid-cols-4 bg-neutral-100 shadow-2xl lg:hidden dark:bg-neutral-800'>
			<NavLink to='/calendar' className='grid place-content-center p-4'>
				<Calendar className='h-6 w-6 shrink-0' />
			</NavLink>
			<NavLink to='/tasks' className='grid place-content-center p-4'>
				<Check className='h-6 w-6 shrink-0' />
			</NavLink>
			<NavLink to='/courses' className='grid place-content-center p-4'>
				<GraduationCap className='h-6 w-6 shrink-0' />
			</NavLink>
			<NavLink to='/settings' className='grid place-content-center p-4'>
				<Settings className='h-6 w-6 shrink-0' />
			</NavLink>
		</div>
	);
};

export default MobileNavigation;
