'use client';

import { Toaster } from '@/components/toast/toaster';
import { useUser } from '@/hooks/use-user';
import { ReactNode } from 'react';
import { CalendarContextProvider } from '../calendar/_context/calendar-context';
import Navigation from './navigation/navigation';

type Props = {
	children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
	const { data: user } = useUser();

	if (!user) {
		return <div className='pt-16'>{children}</div>;
	}

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
