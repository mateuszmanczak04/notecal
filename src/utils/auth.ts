'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { verifyToken } from './jwt';

/**
 * Run this function on the server to check if user is authenticated. It's based on cookies and JWT.
 */
export const getAuthStatus = cache(
	async (): Promise<
		| {
				authenticated: true;
				user: { id: string };
		  }
		| { authenticated: false; user: null }
	> => {
		const cookieStore = await cookies();

		const authToken = cookieStore.get('authToken')?.value;

		if (!authToken) {
			return {
				authenticated: false,
				user: null,
			};
		}

		const decoded = await verifyToken(authToken);

		if (!decoded) {
			return {
				authenticated: false,
				user: null,
			};
		}

		return {
			authenticated: true,
			user: {
				id: decoded.id,
			},
		};
	},
);
