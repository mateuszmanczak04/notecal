'server only';
import { cookies } from 'next/headers';

export const checkAuthenticated = async () => {
	const cookieStore = await cookies();
	// TODO: check if token is valid etc.
	return cookieStore.has('authToken');
};
