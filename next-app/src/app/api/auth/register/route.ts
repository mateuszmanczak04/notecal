import { hashPassword } from '@/utils/bcrypt';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { generateToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { sendConfirmationEmail } from '../../../../utils/send-confirmation-email';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = body.email.trim().toLowerCase();
		const password = body.password;

		if (!email || !password) {
			return Response.json({ error: 'Email and password are required.' }, { status: 400 });
		}

		if (password.length < 6) {
			return Response.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
		}

		const existingUser = await db.user.findUnique({ where: { email } });

		if (existingUser) {
			return Response.json({ error: 'This email is already taken.' }, { status: 409 });
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

		const cookieStore = await cookies();
		cookieStore.set('authToken', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7,
		});
		return Response.json({ success: true }, { status: 200 });
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}
