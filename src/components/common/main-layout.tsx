'use client';

import Navigation from '@/components/common/navigation';
import Providers from '@/components/common/providers';
import queryClient from '@/lib/query-client';
import { Course, Note, Settings, Task } from '@prisma/client';
import React, { useEffect } from 'react';

type MainLayoutProps = {
	children: React.ReactNode;
	notes: Note[];
	courses: Course[];
	tasks: Task[];
	settings: Settings;
};

const MainLayout = ({
	children,
	notes,
	courses,
	tasks,
	settings,
}: MainLayoutProps) => {
	useEffect(() => {
		const setup = async () => {
			await queryClient.setQueryData(['courses'], courses);
			await queryClient.setQueryData(['notes'], notes);
			await queryClient.setQueryData(['tasks'], tasks);
			await queryClient.setQueryData(['settings'], settings);
		};

		setup();
	}, [courses, notes, tasks, settings]);

	return (
		<Providers>
			<div className='flex h-screen overflow-y-hidden p-4 pl-12 xl:pl-4'>
				<Navigation />
				<div className='h-full flex-1 overflow-y-scroll rounded-xl bg-white p-4 scrollbar-hide dark:bg-neutral-800'>
					{children}
				</div>
			</div>
		</Providers>
	);
};

export default MainLayout;
