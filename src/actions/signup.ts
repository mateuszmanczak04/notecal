'use server';

import dbConnect from '@/utils/dbConnect';
import authenticate from './authenticate';
import User from '@/models/User';

const signup = async (_currentState: unknown, formData: FormData) => {
	try {
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		if (!email || !password || !confirmPassword) {
			return 'Missing fields.';
		}

		await dbConnect();

		const userExists = await User.exists({ email });

		if (userExists) return 'Email already taken.';

		if (password !== confirmPassword) return 'Passwords do not match.';

		// create user
		await User.create({ email, password });

		// sign user in after signing up
		await authenticate(_currentState, formData);
	} catch (error: any) {
		if (error) {
			switch (error.type) {
				case 'CredentialsSignup':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
	}
};

export default signup;
