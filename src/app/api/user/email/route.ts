import { getAuthStatus } from '@/utils/auth';
import { comparePasswords } from '@/utils/bcrypt';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { sendConfirmationEmail } from '@/utils/send-confirmation-email';

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const email = body.email;
		const password = body.password;

		if (!email || !password) {
			return Response.json({ error: en.INVALID_DATA }, { status: 400 });
		}

		const { authenticated, user: authUser } = await getAuthStatus();

		// Only authenticated users can change their email
		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		// Check if user exists, should not occur in normal conditions
		const user = await db.user.findUnique({
			where: { id: authUser.id },
			select: { password: true, email: true },
		});
		if (!user) {
			return Response.json({ error: en.auth.USER_DOES_NOT_EXIST }, { status: 404 });
		}

		// Check if new email is the same
		if (user.email === email) {
			return Response.json({ error: en.auth.EMAIL_IS_IDENTICAL }, { status: 400 });
		}

		// Check if password is correct
		const passwordsMatch = await comparePasswords(password, user.password);
		if (!passwordsMatch) {
			return Response.json({ error: en.auth.WRONG_PASSWORD }, { status: 403 });
		}

		// Check if email is not taken
		const userWithEmail = await db.user.findUnique({ where: { email } });
		if (userWithEmail) {
			return Response.json({ error: en.auth.EMAIL_TAKEN }, { status: 409 });
		}

		// Delete tokens associated with old email
		await db.verificationToken.deleteMany({ where: { email: user.email } });
		await db.resetPasswordToken.deleteMany({
			where: { email: user.email },
		});

		// Update email & reset their email confirmed
		await db.user.update({
			where: { id: authUser.id },
			data: { email, emailVerified: null },
		});

		// Users must verify their new email
		await sendConfirmationEmail(email);

		return Response.json({ message: en.auth.EMAIL_UPDATED }, { status: 200 });
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
}
