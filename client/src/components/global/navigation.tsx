import { Calendar, Check, Settings, User } from 'lucide-react';
import { NavLink } from 'react-router';
import { useUser } from '../../hooks/use-user';
import { cn } from '../../utils/cn';
import NavigationCourses from './navigation-courses';

const Navigation = () => {
	const { data: user } = useUser();

	return (
		<div className='hidden h-screen w-96 shrink-0 flex-col gap-8 bg-neutral-100 p-8 lg:flex dark:bg-neutral-800'>
			{/* Account and settings */}
			<NavLink
				to='/settings'
				className='flex select-none items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 dark:bg-neutral-900'>
				<User className='h-8 w-8 shrink-0 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800' />
				<div className='overflow-hidden'>
					<p className='truncate text-sm font-medium'>{user?.email}</p>
				</div>
				<Settings className='h-6 w-6 shrink-0' />
			</NavLink>

			{/* Main menu */}
			<div>
				<p className='text-sm font-semibold uppercase opacity-50'>MENU</p>
				<div className='mt-2'>
					<NavLink
						to='/calendar'
						className={({ isActive }) =>
							cn(
								'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								isActive && 'bg-white dark:bg-neutral-700',
							)
						}>
						<Calendar className='h-4 w-4' /> Calendar
					</NavLink>
					<NavLink
						to='/tasks'
						className={({ isActive }) =>
							cn(
								'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
								isActive && 'bg-white dark:bg-neutral-700',
							)
						}>
						<Check className='h-4 w-4' /> Tasks
					</NavLink>

					<NavigationCourses />
				</div>
			</div>
		</div>
	);
};

export default Navigation;
