import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { isAfter } from 'date-fns';
import { sendConfirmationEmail } from '../../../../utils/send-confirmation-email';

/**
 * Sends a confirmation email to the user.
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = body.email.trim().toLowerCase();

		if (!email) {
			return Response.json({ error: en.INVALID_DATA }, { status: 400 });
		}

		const result = await sendConfirmationEmail(email);
		const status = result.error ? 400 : 200;
		return Response.json(result, { status });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}

/**
 * Makes user's email verified with current date.
 */
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const token = body.token;

		if (!token) {
			return Response.json({ error: 'Invalid token provided.' }, { status: 400 });
		}

		const verificationToken = await db.verificationToken.findFirst({
			where: { token },
		});

		if (!verificationToken) {
			return Response.json({ error: 'Invalid token provided.' }, { status: 400 });
		}

		if (isAfter(new Date(), verificationToken.expires)) {
			return Response.json({ error: 'Your token has expired' }, { status: 400 });
		}

		await db.verificationToken.delete({
			where: { id: verificationToken.id },
		});

		const user = await db.user.findUnique({
			where: { email: verificationToken.email },
		});

		if (!user) {
			return Response.json({ error: 'User not found' }, { status: 404 });
		}

		await db.user.update({
			where: { id: user.id },
			data: { emailVerified: new Date() },
		});

		return Response.json(
			{ message: 'E-mail address confirmed successfully. You can close this page now.' },
			{ status: 200 },
		);
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}
