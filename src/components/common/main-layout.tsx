'use client';

import Navigation from '@/components/common/navigation';
import React from 'react';

type MainLayoutProps = {
	children: React.ReactNode;
	user: {
		email: string;
	};
};

const MainLayout = ({ children, user }: MainLayoutProps) => {
	return (
		<div className='flex h-screen overflow-y-hidden p-4 pl-12 xl:pl-4'>
			<Navigation email={user.email} />
			<div className='h-full flex-1 overflow-y-scroll rounded-xl bg-white p-4 scrollbar-hide dark:bg-neutral-800'>
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
