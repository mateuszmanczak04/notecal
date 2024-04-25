import { getCourses } from '@/actions/get-courses';
import { getTasks } from '@/actions/get-tasks';
import '@/app/globals.css';
import { auth } from '@/auth';
import NavAuthenticated from '@/components/nav-authenticated';
import Providers from '@/components/providers';
import { db } from '@/lib/db';

import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
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

	if (!session?.user?.id) {
		return (
			<html lang='en'>
				<body className={cn(inter.className)}>
					<div className='pt-16'>{children}</div>
				</body>
			</html>
		);
	}

	const initialCourses = (await getCourses())?.courses || [];
	const initialTasks = (await getTasks({ orderBy: 'createdAt' }))?.tasks || [];

	return (
		<html lang='en'>
			<body className={cn(inter.className)}>
				<Providers initialTasks={initialTasks} initialCourses={initialCourses}>
					<NavAuthenticated />
					<div className='pt-16'>{children}</div>
				</Providers>
			</body>
		</html>
	);
}
