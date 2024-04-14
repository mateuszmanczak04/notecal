'use server';

import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import bcrypt from 'bcryptjs';
import authenticate from './authenticate';

const signup = async (_currentState: unknown, formData: FormData) => {
	try {
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		if (
			!email ||
			!password ||
			!confirmPassword ||
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string'
		) {
			return 'Missing or wrong fields.';
		}

		await dbConnect();

		const userExists = await User.exists({ email });

		if (userExists) return 'Email already taken.';

		if (password !== confirmPassword) return 'Passwords do not match.';

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create user
		await User.create({ email, password: hashedPassword });

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
