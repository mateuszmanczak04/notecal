import logout from '@/app/auth/_actions/logout';
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
	if (!authenticated) return logout();

	// Prefetch all needed data for quicker access in client components
	// await Promise.all([
	// 	queryClient.prefetchQuery({
	// 		queryKey: ['user'],
	// 		queryFn: getUser,
	// 	}),
	// 	queryClient.prefetchQuery({
	// 		queryKey: ['courses'],
	// 		queryFn: getCourses,
	// 	}),
	// 	queryClient.prefetchQuery({
	// 		queryKey: ['notes'],
	// 		queryFn: getNotes,
	// 	}),
	// 	queryClient.prefetchQuery({
	// 		queryKey: ['tasks'],
	// 		queryFn: getTasks,
	// 	}),
	// ]);

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
