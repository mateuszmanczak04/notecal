import type { Request, Response } from 'express';
import db from '../prisma/db';
import { comparePasswords, hashPassword } from '../utils/bcrypt';

export const getUser = (req: Request, res: Response) => {
	res.status(200).json({ user: req.user });
};

export const updateEmail = async (req: Request, res: Response) => {};

export const updatePassword = async (req: Request, res: Response) => {
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	if (!oldPassword || !newPassword) {
		res.status(400).end();
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
