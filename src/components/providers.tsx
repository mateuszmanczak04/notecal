'use client';

import queryClient from '@/lib/query-client';
import { Course, Task } from '@prisma/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
	initialTasks: Task[];
	initialCourses: Course[];
}

const Providers: FC<ProvidersProps> = ({
	children,
	initialTasks,
	initialCourses,
}) => {
	// queryClient.setQueryData(['tasks'], initialTasks);
	// queryClient.setQueryData(['courses'], initialCourses);

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
