import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// everything below in this file is made my myself
// in other way than in tutorial by referring to the docs

declare module 'next-auth' {
	interface User {
		id: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {}
}
