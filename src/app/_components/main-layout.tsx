'use client';

import { Toaster } from '@/components/toast/toaster';
import { useUser } from '@/hooks/use-user';
import { DEFAULT_LOGIN_REDIRECT, routesForAllUsers, routesForUnauthenticatedUsers } from '@/routes';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { CalendarContextProvider } from '../calendar/_context/calendar-context';
import Navigation from './navigation/navigation';

type Props = {
	children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
	const pathname = usePathname();
	const { data: user, isPending } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (isPending) return;

		if (routesForUnauthenticatedUsers.includes(pathname) && user) {
			router.replace(DEFAULT_LOGIN_REDIRECT);
			return;
		}

		if (!user && !routesForAllUsers.includes(pathname) && !routesForUnauthenticatedUsers.includes(pathname)) {
			router.replace('/');
			return;
		}
	}, [user, pathname]);

	if (isPending) return;

	if (routesForAllUsers.includes(pathname) || routesForUnauthenticatedUsers.includes(pathname))
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
