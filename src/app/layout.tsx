import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavUnauthenticated from '@/components/NavUnauthenticated';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/utils/auth';
import NavAuthenticated from '@/components/NavAuthenticated';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang='en'>
			<body className={inter.className + ' pt-16'}>
				<SessionProvider>
					{session ? <NavAuthenticated /> : <NavUnauthenticated />}
					{children}
				</SessionProvider>
			</body>
		</html>
	);
}
