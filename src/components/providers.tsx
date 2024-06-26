'use client';

import queryClient from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode, useLayoutEffect } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	useLayoutEffect(() => {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				{children}
				<ReactQueryDevtools initialIsOpen={false} position='bottom' />
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
