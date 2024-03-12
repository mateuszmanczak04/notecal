'use server';

import { signOut } from '@/utils/auth';

const logout = async () => {
	await signOut();
};

export default logout;
