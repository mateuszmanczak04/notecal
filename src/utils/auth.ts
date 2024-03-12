import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const config: NextAuthConfig = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				console.log('credentials', credentials);
				const user = { id: '1', name: 'Mateusz' };
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
