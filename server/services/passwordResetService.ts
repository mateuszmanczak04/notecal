import db from '../prisma/db';

/**
 * Query to the database to find a ResetPasswordToken by email.
 */
const getResetTokenByEmail = async (email: string) => {
	const resetToken = await db.resetPasswordToken.findFirst({
		where: { email },
	});
	return resetToken;
};

/**
 * Deletes an existing token (if any) and creates a new reset token.
 */
export const generateResetToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

	const existingToken = await getResetTokenByEmail(email);
	if (existingToken) {
		await db.resetPasswordToken.delete({
			where: { id: existingToken.id },
		});
	}

	const resetToken = await db.resetPasswordToken.create({
		data: { email, token, expires },
	});

	return resetToken;
};
