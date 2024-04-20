import '@/app/globals.css';
import { auth } from '@/auth';
import NavAuthenticated from '@/components/nav-authenticated';
import { CoursesContextProvider } from '@/context/CoursesContext';
import { SettingsContextProvider } from '@/context/SettingsContext';
import { TasksContextProvider } from '@/context/TasksContext';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';

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
			<body className={cn(inter.className)}>
				<SessionProvider>
					<SettingsContextProvider>
						<CoursesContextProvider>
							<TasksContextProvider>
								{session && <NavAuthenticated />}
								<div className='pt-16'>{children}</div>
								{/* a root for displaying modals on top of the page */}
								<div id='modal-root'></div>
							</TasksContextProvider>
						</CoursesContextProvider>
					</SettingsContextProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
