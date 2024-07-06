import '@/app/globals.css';
import { auth } from '@/auth';
import Navigation from '@/components/common/navigation';
import Providers from '@/components/common/providers';

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

	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'flex h-screen min-w-[1200px] overflow-y-hidden overflow-x-scroll bg-gray-100 p-4 text-gray-900',
				)}>
				<Providers>
					<Navigation />
					<div className='h-full flex-1 overflow-y-scroll rounded-xl bg-white p-4 scrollbar-hide'>
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
