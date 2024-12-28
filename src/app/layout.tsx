import MainLayout from '@/app/_components/main-layout';
import '@/app/globals.css';
import { getAuthStatus } from '@/utils/auth';
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Viewport } from 'next';
import { Inter } from 'next/font/google';
import Providers from './_components/providers';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	userScalable: false,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { authenticated } = await getAuthStatus();

	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'bg-neutral-100 fill-neutral-800 text-neutral-800 dark:bg-neutral-900 dark:fill-neutral-100 dark:text-neutral-100',
					authenticated && 'overscroll-none',
				)}>
				{authenticated ? (
					<Providers>
						<MainLayout>{children}</MainLayout>
					</Providers>
				) : (
					<div className='pt-16'>{children}</div>
				)}

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
