import type { Request, Response } from 'express';
import db from '../prisma/db';
import { sendConfirmationEmail } from '../services/emailService';
import { comparePasswords, hashPassword } from '../utils/bcrypt';

export const getUser = (req: Request, res: Response) => {
	res.status(200).json({ user: req.user });
};

export const updateEmail = async (req: Request, res: Response) => {
	const email = req.body.email.trim().toLowerCase();
	const password = req.body.password;

	if (!email || !password) {
		res.status(400).json({ error: 'Invalid data.' });
		return;
	}

	const user = req.user!;

	// Check if new email is the same
	if (user.email === email) {
		res.status(400).json({ error: 'New email is identical to the old one.' });
		return;
	}

	// Check if password is correct
	const passwordsMatch = await comparePasswords(password, user.password);
	if (!passwordsMatch) {
		res.status(403).json({ error: 'Wrong password' });
		return;
	}

	// Check if email is not taken
	const userWithEmail = await db.user.findUnique({ where: { email } });
	if (userWithEmail) {
		res.status(409).json({ error: 'This email is already taken' });
		return;
	}

	// Delete tokens associated with old email
	await db.verificationToken.deleteMany({ where: { email: user.email } });
	await db.resetPasswordToken.deleteMany({
		where: { email: user.email },
	});

	// Update email & reset their email confirmed
	await db.user.update({
		where: { id: user.id },
		data: { email, emailVerified: null },
	});

	// Users must verify their new email
	await sendConfirmationEmail(email);

	res.status(200).json({ message: 'Successfully updated email' });
};

export const updatePassword = async (req: Request, res: Response) => {
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	if (!oldPassword || !newPassword) {
		res.status(400).json({ error: 'Invalid data.' });
		return;
	}

	if (newPassword.length < 6) {
		res.status(400).json({ error: 'Password must be at least 6 characters long.' });
		return;
	}

	const user = req.user!;

	const passwordsMatch = await comparePasswords(oldPassword, user.password);
	if (!passwordsMatch) {
		res.status(403).json({ error: 'Wrong old password.' });
	}

	const hashedPassword = await hashPassword(newPassword);
	await db.user.update({
		where: { id: user.id },
		data: { password: hashedPassword },
	});

	res.status(200).json({ message: 'Successfully updated password.' });
};
