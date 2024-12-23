import Navigation from '@/app/_components/navigation';
import logout from '@/app/auth/_actions/logout';
import { getCourses, getNotes, getTasks, getUser } from '@/utils/cached-queries';
import React from 'react';
import AppContextProvider from './app-context';

type Props = {
	children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
	const user = await getUser();

	if (!user) return logout();

	const tasks = await getTasks();
	const courses = await getCourses();
	const notes = await getNotes();

	return (
		<AppContextProvider tasks={tasks} courses={courses} notes={notes}>
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
