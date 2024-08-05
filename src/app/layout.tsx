import '@/app/globals.css';
import { auth } from '@/auth';
import UnauthenticatedProviders from '@/components/common/unauthenticated-providers';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainLayout from './_components/main-layout';

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
				<body className={cn(inter.className)}>
					<UnauthenticatedProviders>
						<div className='pt-16'>{children}</div>
					</UnauthenticatedProviders>
				</body>
			</html>
		);
	}

	return (
		<html lang='en'>
			<body className={inter.className}>
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}
