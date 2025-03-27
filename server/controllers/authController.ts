import type { Request, Response } from 'express';
import db from '../prisma/db';
import { sendConfirmationEmail } from '../services/emailService';
import { generateToken } from '../services/jwtService';
import { comparePasswords, hashPassword } from '../utils/bcrypt';

export const register = async (req: Request, res: Response) => {
	const email = req.body.email.trim().toLowerCase();
	const password = req.body.password;

	if (!email || !password) {
		res.status(400).json({ error: 'Email and password are required.' });
		return;
	}

	if (password.length < 6) {
		res.status(400).json({ error: 'Password must be at least 6 characters long.' });
		return;
	}

	const existingUser = await db.user.findUnique({ where: { email } });

	if (existingUser) {
		res.status(409).json({ error: 'This email is already taken.' });
		return;
	}

	const hashedPassword = await hashPassword(password);

	const user = await db.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	const token = await generateToken({ id: user.id });

	sendConfirmationEmail(email);

	res.cookie('authToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
	});

	res.status(200).end();
};

export const login = async (req: Request, res: Response) => {
	const email = req.body.email.trim().toLowerCase();
	const password = req.body.password;

	if (!email || !password || email.length === 0 || password.length === 0) {
		res.status(401).json({ error: 'Invalid credentials.' });
		return;
	}

	const user = await db.user.findUnique({
		where: { email },
	});

	if (!user) {
		res.status(401).json({ error: 'Invalid credentials.' });
		return;
	}

	if (!(await comparePasswords(password, user.password))) {
		res.status(401).json({ error: 'Invalid credentials.' });
		return;
	}

	const authToken = await generateToken({ id: user.id });

	res.cookie('authToken', authToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7,
	});

	res.status(200).end();
};

export const logout = (_req: Request, res: Response) => {
	res.clearCookie('authToken');
	res.status(200).end();
};

export const sendVerificationEmail = async (req: Request, res: Response) => {};
export const verifyEmail = async (req: Request, res: Response) => {};
export const sendForgotPasswordEmail = async (req: Request, res: Response) => {};
export const resetPassword = async (req: Request, res: Response) => {};
