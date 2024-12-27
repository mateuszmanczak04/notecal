'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

/**
 * Creates a new instance of QueryClient with default options.
 */
const makeQueryClient = () => {
	return new QueryClient();
};

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * On the server always create a new queryClient but on the
 * client first check if there is any existing one before.
 */
const getQueryClient = () => {
	if (isServer) {
		return makeQueryClient();
	}
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
};

const Providers = ({ children }: { children: ReactNode }) => {
	const queryClient = getQueryClient();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
