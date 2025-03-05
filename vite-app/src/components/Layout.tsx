import { Outlet } from 'react-router';
import Navigation from './Navigation';

export default function Layout() {
	return (
		<div className='flex pl-12 xl:pl-80 dark:bg-neutral-800'>
			<Navigation />
			<div className='min-h-screen flex-1 bg-white dark:bg-neutral-800'>
				<Outlet />
			</div>
		</div>
	);
}
