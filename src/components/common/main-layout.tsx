'use client';

import Navigation from '@/components/common/navigation';
import Providers from '@/components/common/providers';
import React from 'react';

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<Providers>
			<div className='flex h-screen overflow-y-hidden p-4 pl-12 xl:pl-4'>
				<Navigation />
				<div className='h-full flex-1 overflow-y-scroll rounded-xl bg-white p-4 scrollbar-hide'>
					{children}
				</div>
			</div>
		</Providers>
	);
};

export default MainLayout;
