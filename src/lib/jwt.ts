'use server';
import { jwtVerify, SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

if (!process.env.AUTH_SECRET) {
	throw new Error('process.env.AUTH_SECRET is missing');
}

export const generateToken = async (payload: any) => {
	return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('24h').sign(SECRET);
};

export const verifyToken = async (token: string) => {
	const { payload } = await jwtVerify(token, SECRET);
	return payload;
};
