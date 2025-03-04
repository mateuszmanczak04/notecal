'server-only';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete('authToken');
	console.log('redirect');
	redirect(DEFAULT_LOGIN_REDIRECT);
};
