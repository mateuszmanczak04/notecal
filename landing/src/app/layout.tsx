import { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '../utils/cn';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	userScalable: false,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'fill-neutral-800 text-neutral-800 dark:bg-neutral-900 dark:fill-neutral-100 dark:text-neutral-100',
				)}>
				{children}
			</body>
		</html>
	);
}
