'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete('authToken');
	redirect('/');
};

export default logout;
