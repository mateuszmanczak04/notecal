import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useUser } from '../hooks/use-user';
import { DEFAULT_LOGIN_REDIRECT, routesForAllUsers, routesForUnauthenticatedUsers } from '../utils/routes';
import Navigation from './Navigation';
import { CalendarContextProvider } from './calendar/context/calendar-context';
import { Toaster } from './toast/toaster';

export default function Layout() {
	const location = useLocation();
	const { data: user, isPending } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isPending) return;

		console.log(user);

		if (routesForUnauthenticatedUsers.includes(location.pathname) && user) {
			navigate(DEFAULT_LOGIN_REDIRECT);
			return;
		}

		if (
			!user &&
			!routesForAllUsers.includes(location.pathname) &&
			!routesForUnauthenticatedUsers.includes(location.pathname)
		) {
			navigate('/auth/login');
			return;
		}
	}, [user, location.pathname, isPending, navigate]);

	if (isPending) return;

	if (routesForAllUsers.includes(location.pathname) || routesForUnauthenticatedUsers.includes(location.pathname))
		return (
			<div className='pt-16'>
				<Outlet />
			</div>
		);

	return (
		<CalendarContextProvider>
			<div className='flex pl-12 xl:pl-80 dark:bg-neutral-800'>
				<Navigation />
				<div className='min-h-screen flex-1 bg-white dark:bg-neutral-800'>
					<Outlet />
				</div>
			</div>
			<Toaster />
		</CalendarContextProvider>
	);
}
