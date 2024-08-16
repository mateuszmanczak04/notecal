import '@/app/globals.css';
import { auth } from '@/auth';
import UnauthenticatedProviders from '@/components/common/unauthenticated-providers';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainLayout from '../components/common/main-layout';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'NoteCal - Organize Your Notes',
	description:
		'A productivity app which was made to keep your school notes organised based on lesson.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session?.user?.id) {
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
				</body>
			</html>
		);
	}

	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'bg-neutral-100 fill-neutral-800 text-neutral-800 dark:bg-neutral-900 dark:fill-neutral-100 dark:text-neutral-100',
				)}>
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}
