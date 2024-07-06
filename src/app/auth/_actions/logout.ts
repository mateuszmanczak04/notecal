'use server';

import { signOut } from '@/auth';

const logout = async () => {
	await signOut({ redirectTo: '/' });
};

export default logout;
