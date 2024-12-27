import Navigation from '@/app/_components/navigation';
import logout from '@/app/auth/_actions/logout';
import { getUser } from '@/utils/get-user';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import getCourses from '../courses/_actions/get-courses';
import getNotes from '../notes/_actions/get-notes';
import getSettings from '../settings/_actions/get-settings';
import getTasks from '../tasks/_actions/get-tasks';

type Props = {
	children: ReactNode;
};

/**
 * This layout is shown only to authenticated users.
 * Unauthenticated users get just a static landing page instead
 * for better loading time.
 */
const MainLayout = async ({ children }: Props) => {
	const queryClient = new QueryClient();

	// Check if user is authenticated, if not logout them
	const user = await getUser();
	if (!user) return logout();

	// Prefetch all needed data for quicker access in client components
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ['settings'],
			queryFn: getSettings,
		}),
		queryClient.prefetchQuery({
			queryKey: ['courses'],
			queryFn: getCourses,
		}),
		queryClient.prefetchQuery({
			queryKey: ['notes'],
			queryFn: getNotes,
		}),
		queryClient.prefetchQuery({
			queryKey: ['tasks'],
			queryFn: () => getTasks({}),
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{/* <CalendarContextProvider> */}
			<div className='flex h-screen overflow-y-hidden p-4 pl-12 xl:pl-4'>
				<Navigation email={user.email} />
				<div className='h-full flex-1 overflow-y-scroll rounded-xl bg-white p-4 scrollbar-hide dark:bg-neutral-800'>
					{children}
				</div>
			</div>
			{/* </CalendarContextProvider> */}
		</HydrationBoundary>
	);
};

export default MainLayout;
