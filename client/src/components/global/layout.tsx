import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useUser } from '../../hooks/use-user';
import { DEFAULT_LOGIN_REDIRECT, routesForAllUsers, routesForUnauthenticatedUsers } from '../../utils/routes';
import { CalendarContextProvider } from '../calendar/context/calendar-context';
import { Toaster } from '../toast/toaster';
import LoadingScreen from './loading-screen';
import MobileNavigation from './mobile-navigation';
import Navigation from './navigation';

export default function Layout() {
	const location = useLocation();
	const { data: user, isPending } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isPending) return;

		if (routesForUnauthenticatedUsers.includes(location.pathname) && user) {
			navigate(DEFAULT_LOGIN_REDIRECT);
			return;
		}

		if (
			!user &&
			!routesForAllUsers.includes(location.pathname) &&
			!routesForUnauthenticatedUsers.includes(location.pathname)
		) {
			navigate(`/auth/login?origin=${location.pathname}${location.search}`);
			return;
		}
	}, [user, location.pathname, location.search, isPending, navigate]);

	if (isPending) return <LoadingScreen />;

	if (routesForAllUsers.includes(location.pathname) || routesForUnauthenticatedUsers.includes(location.pathname))
		return (
			<div className='pt-16'>
				<Outlet />
			</div>
		);

	return (
		<CalendarContextProvider>
			<div className='flex h-screen w-screen flex-col-reverse overflow-hidden lg:flex-row'>
				<Navigation />
				<MobileNavigation />
				<div className='scrollbar-hide flex-1 overflow-y-scroll'>
					<Outlet />
				</div>
			</div>
			<Toaster />
		</CalendarContextProvider>
	);
}
