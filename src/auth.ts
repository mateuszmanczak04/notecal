import { db } from '@/lib/db';
import { LoginSchema } from '@/schemas';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		signOut: '/',
		error: '/auth/error',
	},
	session: {
		strategy: 'jwt', // "Signing in with credentials only supported if JWT strategy is enabled .Read more at https://errors.authjs.dev#unsupportedstrategy"
	},
	adapter: PrismaAdapter(prisma),
	callbacks: {
		session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	providers: [
		credentials({
			async authorize(credentials) {
				// return null <=> wrong credentials
				// throw error <=> an error occurred
				const validatedFields = LoginSchema.safeParse(credentials);

				if (!validatedFields.success) return null;

				const { email, password } = validatedFields.data;

				const user = await db.user.findUnique({ where: { email } });

				// if user does not exist or
				// if user does not have password, so he has to be signed
				// up with a different provider:
				if (!user || !user.password) return null;

				// compare passwords:
				const passwordsMatch = await bcrypt.compare(password, user.password);
				if (!passwordsMatch) return null;

				return user;
			},
		}),
	],
});
