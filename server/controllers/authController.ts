import bcryptjs from 'bcryptjs';
import { isAfter } from 'date-fns';
import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { CLIENT_DOMAIN } from '../config/constants';
import db from '../prisma/db';
import { sendConfirmationEmail } from '../services/emailService';
import { generateToken } from '../services/jwtService';
import { generateResetToken } from '../services/passwordResetService';
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

export const sendVerificationEmail = async (req: Request, res: Response) => {
	const email = req.body.email.trim().toLowerCase();

	if (!email) {
		res.status(400).json({ error: 'Invalid data.' });
		return;
	}

	const result = await sendConfirmationEmail(email);
	const status = result.error ? 400 : 200;

	res.status(status).json(result);
};

export const verifyEmail = async (req: Request, res: Response) => {
	const token = req.body.token;

	if (!token) {
		res.status(400).json({ error: 'Invalid token provided.' });
		return;
	}

	const verificationToken = await db.verificationToken.findFirst({
		where: { token },
	});

	if (!verificationToken) {
		res.status(400).json({ error: 'Invalid token provided.' });
		return;
	}

	if (isAfter(new Date(), verificationToken.expires)) {
		res.status(400).json({ error: 'Your token has expired.' });
		return;
	}

	await db.verificationToken.delete({
		where: { id: verificationToken.id },
	});

	const user = await db.user.findUnique({
		where: { email: verificationToken.email },
	});

	if (!user) {
		res.status(404).json({ error: 'User not found.' });
		return;
	}

	await db.user.update({
		where: { id: user.id },
		data: { emailVerified: new Date() },
	});

	res.status(200).json({ message: 'E-mail address verified successfully. You can close this page now.' });
	return;
};

export const sendForgotPasswordEmail = async (req: Request, res: Response) => {
	const email = req.body.email.trim().toLowerCase();

	if (!email || email.length === 0) {
		res.status(404).json({ error: 'Invalid email.' });
		return;
	}

	const user = await db.user.findUnique({ where: { email } });

	// If user doesn't exist or email isn't verified, fake success response.
	if (!user || !user.emailVerified) {
		res.status(200).json({ message: 'Email sent successfully, please check your inbox.' });
		return;
	}

	// Setup nodemailer transporter.
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// Generate reset token.
	const tokenData = await generateResetToken(email);
	const url = `${CLIENT_DOMAIN}/auth/reset-password?token=${tokenData.token}&email=${email}`;

	// Email template.
	const html = `
            <div
                style="
                    font-family: sans-serif;
                    padding: 16px;
                    border-radius: 16px;
                    text-align: center;
                    max-width: 400px;">
                <h1 style="font-size: 32px; margin: 0">Recover access to your account</h1>
                <p style="font-size: 16px; margin: 0; margin-top: 8px">
                    Hi ${email}, click the button below to reset your password
                </p>
                <a
                    href="${url}"
                    style="
                        margin-top: 16px;
                        display: block;
                        text-decoration: none;
                        background-color: #3b82f6;
                        color: #ffffff;
                        height: 40px;
                        font-size: 16px;
                        padding: 0 32px;
                        line-height: 40px;
                        border-radius: 6px;
                        font-family: inherit;">
                    Click
                </a>
            </div>
        `;

	await transporter.sendMail({
		from: 'Notecal <noreply@notecal.app>',
		to: email,
		subject: 'Reset your password',
		html,
	});

	res.status(200).json({ message: 'Email sent successfully, please check your inbox.' });
};

export const resetPassword = async (req: Request, res: Response) => {
	const email = req.body.email.trim().toLowerCase();
	const password = req.body.password;
	const token = req.body.token;

	if (!email || email.length === 0 || !password || password.length === 0 || !token) {
		res.status(400).json({ error: 'Invalid data.' });
		return;
	}

	const resetToken = await db.resetPasswordToken.findFirst({
		where: { token },
	});

	if (!resetToken || resetToken.email !== email) {
		res.status(400).json({ error: 'Invalid token.' });
		return;
	}

	const user = await db.user.findFirst({
		where: { email: resetToken.email },
	});

	if (!user) {
		res.status(400).json({ error: 'User not found.' });
		return;
	}

	const hashedPassword = await bcryptjs.hash(password, 10);
	await db.user.update({
		where: { email: resetToken.email },
		data: { password: hashedPassword },
	});

	await db.resetPasswordToken.deleteMany({
		where: { email: resetToken.email },
	});

	const jwtToken = await generateToken({ id: user.id });

	res.cookie('authToken', jwtToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
	});

	res.status(200).json({ message: 'Password reset successfully' });
};
