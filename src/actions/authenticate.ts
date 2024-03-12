'use server';

import { signIn } from '@/utils/auth';

const authenticate = async (_currentState: unknown, formData: FormData) => {
	try {
		await signIn('credentials', formData);
	} catch (error: any) {
		if (error) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
	}
};

export default authenticate;
