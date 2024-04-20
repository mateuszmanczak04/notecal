'use client';

import { CoursesContextProvider } from '@/context/CoursesContext';
import { SettingsContextProvider } from '@/context/SettingsContext';
import { TasksContextProvider } from '@/context/TasksContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode, useState } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<SettingsContextProvider>
					<CoursesContextProvider>
						<TasksContextProvider>
							<ReactQueryDevtools />
							{children}
						</TasksContextProvider>
					</CoursesContextProvider>
				</SettingsContextProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
