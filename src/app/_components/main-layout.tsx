import Navigation from '@/app/_components/navigation';
import logout from '@/app/auth/_actions/logout';
import { getUser } from '@/utils/get-user';
import React from 'react';
import getCourses from '../courses/_actions/get-courses';
import getNotes from '../notes/_actions/get-notes';
import getSettings from '../settings/_actions/get-settings';
import getTasks from '../tasks/_actions/get-tasks';
import AppContextProvider from './app-context';

type Props = {
	children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
	const user = await getUser();

	if (!user) return logout();

	const tasks = await getTasks({});
	const courses = await getCourses();
	const notes = await getNotes();
	const settings = await getSettings();

	if ('error' in settings) return <p>Could not load user settings, please refresh</p>;

	return (
		<AppContextProvider
			initialTasks={tasks}
			initialCourses={courses}
			initialNotes={notes}
			initialSettings={settings}
			initialUser={{ id: user.id, email: user.email, emailVerified: !!user.emailVerified }}>
			<div className='flex h-screen overflow-y-hidden p-4 pl-12 xl:pl-4'>
				<Navigation email={user.email} />
				<div className='h-full flex-1 overflow-y-scroll rounded-xl bg-white p-4 scrollbar-hide dark:bg-neutral-800'>
					{children}
				</div>
			</div>
		</AppContextProvider>
	);
};

export default MainLayout;
