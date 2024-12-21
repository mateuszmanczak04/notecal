import jwt from 'jsonwebtoken';

const SECRET = process.env.AUTH_SECRET;

export const generateToken = (data: any) => {
	if (!SECRET) throw new Error('process.env.AUTH_SECRET is missing');
	return jwt.sign(data, SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: any) => {
	if (!SECRET) throw new Error('process.env.AUTH_SECRET is missing');
	return jwt.verify(token, SECRET);
};
