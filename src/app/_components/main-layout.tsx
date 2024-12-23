import Navigation from '@/app/_components/navigation';
import logout from '@/app/auth/_actions/logout';
import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import React from 'react';

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = async ({ children }: MainLayoutProps) => {
	// We assume user can't see this layout not being authenticated
	const { user: authUser } = (await getAuthStatus()) as { user: { id: string } };

	const user = await db.user.findUnique({
		where: { id: authUser.id },
	});

	if (!user) return logout();

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
