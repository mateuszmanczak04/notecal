import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CalendarContextProvider } from '../components/calendar/context/calendar-context';
import { useUser } from '../hooks/use-user';
import { DEFAULT_LOGIN_REDIRECT, routesForAllUsers, routesForUnauthenticatedUsers } from '../utils/routes';
import Navigation from './Navigation';
import { Toaster } from './toast/toaster';

type Props = {
	children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
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
			navigate('/');
			return;
		}
	}, [user, location.pathname, isPending, navigate]);

	if (isPending) return;

	if (routesForAllUsers.includes(location.pathname) || routesForUnauthenticatedUsers.includes(location.pathname))
		return <div className='pt-16'>{children}</div>;

	return (
		<CalendarContextProvider>
			<div className='flex pl-12 xl:pl-80 dark:bg-neutral-800'>
				<Navigation />
				<div className='min-h-screen flex-1 bg-white dark:bg-neutral-800'>{children}</div>
			</div>
			<Toaster />
		</CalendarContextProvider>
	);
};

export default MainLayout;
