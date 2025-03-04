import { Toaster } from '@/components/toast/toaster';
import { getAuthStatus } from '@/utils/auth';
import { ReactNode } from 'react';
import { CalendarContextProvider } from '../calendar/_context/calendar-context';
import Navigation from './navigation/navigation';

type Props = {
	children: ReactNode;
};

/**
 * This layout is shown only to authenticated users.
 * Unauthenticated users get just a static landing page instead
 * for better loading time.
 */
const MainLayout = async ({ children }: Props) => {
	// Check if user is authenticated, if not logout them
	const { authenticated } = await getAuthStatus();
	if (!authenticated) return fetch('/api/auth/logout', { method: 'POST' });

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
