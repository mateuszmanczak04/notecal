import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from './dbConnect';
import User from '@/models/User';

const config: NextAuthConfig = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials;

				if (!email || !password) {
					return null;
				}

				await dbConnect();

				const user = await User.findOne({
					email,
				});

				if (!user) {
					return null;
				}

				if (user.password !== password) {
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
