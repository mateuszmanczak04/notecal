import { Calendar, Check, Menu, Settings, User, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { useUser } from '../../hooks/use-user';
import { cn } from '../../utils/cn';
import { Button } from '../button';
import NavigationCourses from './navigation-courses';

const Navigation = () => {
	const { data: user } = useUser();
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Open button */}
			<Button
				variant='secondary'
				className={cn(
					'transiton fixed top-0 left-0 z-50 h-full w-12 translate-x-0 rounded-none xl:hidden dark:bg-neutral-800 dark:text-neutral-100',
					isOpen && '-translate-x-32',
				)}
				aria-label='open menu button'
				title='open menu button'
				onClick={handleOpen}>
				<Menu />
			</Button>
			<div
				className={cn(
					'fixed top-0 left-0 z-50 mr-4 flex h-screen w-screen shrink-0 translate-x-0 flex-col gap-8 bg-neutral-100 p-8 pl-20 shadow-lg transition sm:w-96 xl:max-w-80 xl:p-6 xl:shadow-none dark:bg-neutral-800',
					!isOpen && '-translate-x-full xl:translate-x-0',
				)}>
				{/* Close button */}
				<Button
					variant='secondary'
					className='transiton fixed top-0 left-0 z-10 h-full w-12 translate-x-0 rounded-none bg-neutral-200 xl:hidden dark:bg-neutral-900 dark:text-neutral-100'
					onClick={handleClose}
					aria-label='close menu button'
					title='close menu button'>
					<X />
				</Button>

				{/* Account and settings */}
				<NavLink
					to='/settings'
					onClick={handleClose}
					className='flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 select-none dark:bg-neutral-900'>
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
							}
							onClick={handleClose}>
							<Calendar className='h-4 w-4' /> Calendar
						</NavLink>
						<NavLink
							to='/tasks'
							className={({ isActive }) =>
								cn(
									'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
									isActive && 'bg-white dark:bg-neutral-700',
								)
							}
							onClick={handleClose}>
							<Check className='h-4 w-4' /> Tasks
						</NavLink>

						<NavigationCourses closeNavigation={handleClose} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
