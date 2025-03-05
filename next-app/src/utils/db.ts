import { PrismaClient } from '@prisma/client';

// we do all of this for development mode to not create
// new client every hot reload in next.js

declare global {
	var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export default db;
