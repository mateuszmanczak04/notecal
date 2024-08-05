'use client';

import queryClient from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode, useLayoutEffect } from 'react';

interface UnauthenticatedProvidersProps {
	children: ReactNode;
}

const UnauthenticatedProviders: FC<UnauthenticatedProvidersProps> = ({
	children,
}) => {
	useLayoutEffect(() => {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			{children}
			<ReactQueryDevtools initialIsOpen={false} position='bottom' />
		</QueryClientProvider>
	);
};

export default UnauthenticatedProviders;
