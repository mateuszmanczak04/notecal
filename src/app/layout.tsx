import { auth } from '@/auth';
import NavAuthenticated from '@/components/nav-authenticated';
import NavUnauthenticated from '@/components/nav-unauthenticated';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';

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

	return (
		<html lang='en'>
			<body className={cn(inter.className, 'pt-16')}>
				<SessionProvider>
					{session ? <NavAuthenticated /> : <NavUnauthenticated />}
					{children}
					{/* a root for displaying modals on top of the page */}
					<div id='modal-root'></div>
				</SessionProvider>
			</body>
		</html>
	);
}
