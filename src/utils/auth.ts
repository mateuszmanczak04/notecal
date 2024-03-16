import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from './dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const config: NextAuthConfig = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials;

				if (
					!email ||
					!password ||
					typeof email !== 'string' ||
					typeof password !== 'string'
				) {
					return null;
				}

				await dbConnect();

				const user = await User.findOne({
					email,
				});

				if (!user) {
					return null;
				}

				// check if password matches
				const isPasswordMatch = await bcrypt.compare(password, user.password);
				if (!isPasswordMatch) {
					return null;
				}

				return user;
			},
		}),
	],
};

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth(config);
