'use server';
import { jwtVerify, SignJWT } from 'jose';

export type JWT_AUTH = {
	id: string;
};

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

if (!process.env.AUTH_SECRET) {
	throw new Error('process.env.AUTH_SECRET is missing');
}

export const generateToken = async (payload: JWT_AUTH): Promise<string> => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime('24h')
		.sign(SECRET);
};

export const verifyToken = async (token: string): Promise<JWT_AUTH | null> => {
	const { payload } = await jwtVerify(token, SECRET);

	if (typeof payload !== 'object' || !payload || typeof payload.id !== 'string') {
		return null;
	}

	return payload as JWT_AUTH;
};
