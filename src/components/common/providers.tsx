'use client';

import queryClient from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode, useEffect } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	useEffect(() => {
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{/* <CalendarContextProvider>
				<TasksHistoryContextProvider> */}
			<ReactQueryDevtools />
			{children}
			<ReactQueryDevtools initialIsOpen={false} position='bottom' />
			{/* </TasksHistoryContextProvider>
			</CalendarContextProvider> */}
		</QueryClientProvider>
	);
};

export default Providers;
