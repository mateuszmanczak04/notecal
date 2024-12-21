'server-only';
import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

/**
 * Run this function on the server to check if user is authenticated. It's based on cookies and JWT.
 */
export const getAuthStatus = async (): Promise<
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

	try {
		const decoded = await verifyToken(authToken);

		return {
			authenticated: true,
			user: {
				id: decoded.id as string,
			},
		};
	} catch (err) {
		return {
			authenticated: false,
			user: null,
		};
	}
};
