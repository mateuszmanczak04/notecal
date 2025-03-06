import bcryptjs from 'bcryptjs';
import { cookies } from 'next/headers';
import db from '../../../../utils/db';
import { en } from '../../../../utils/dictionary';
import { generateToken } from '../../../../utils/jwt';

/**
 * A function updating user password after they forgot it.
 */
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const email = body.email.trim().toLowerCase();
		const password = body.password;
		const token = body.token;

		if (!email || email.length === 0 || !password || password.length === 0) {
			return Response.json({ error: 'Email and password are required.' }, { status: 400 });
		}

		if (!token) {
			return Response.json({ error: 'Invalid token provided.' }, { status: 400 });
		}

		const resetToken = await db.resetPasswordToken.findFirst({
			where: { token },
		});

		if (!resetToken) {
			return Response.json({ error: 'Invalid token provided.' }, { status: 400 });
		}

		if (resetToken.email !== email) {
			return Response.json({ error: 'Invalid token provided.' }, { status: 400 });
		}

		const user = await db.user.findFirst({
			where: { email: resetToken.email },
		});
		if (!user) {
			return Response.json({ error: 'User not found' }, { status: 404 });
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

		const cookieStore = await cookies();
		cookieStore.set('authToken', jwtToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
		});

		return Response.json({ message: 'Password reset successfully' }, { status: 200 });
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}
