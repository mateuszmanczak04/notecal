import '@/app/globals.css';
import MainLayout from '@/components/common/main-layout';
import UnauthenticatedProviders from '@/components/common/unauthenticated-providers';
import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { authenticated, user: authUser } = await getAuthStatus();

	if (!authenticated) {
		return (
			<html lang='en'>
				<body
					className={cn(
						inter.className,
						'bg-white fill-neutral-800 text-neutral-800 dark:bg-neutral-900 dark:fill-neutral-100 dark:text-neutral-100',
					)}>
					<UnauthenticatedProviders>
						<div className='pt-16'>{children}</div>
					</UnauthenticatedProviders>
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		);
	}

	const user = await db.user.findUnique({
		where: { id: authUser.id },
	});

	if (!user) {
		// Should not occur in normal conditions
		(await cookies()).delete('authToken');
		redirect('/auth/login');
	}

	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'bg-neutral-100 fill-neutral-800 text-neutral-800 dark:bg-neutral-900 dark:fill-neutral-100 dark:text-neutral-100',
				)}>
				<MainLayout user={{ email: user.email }}>{children}</MainLayout>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
