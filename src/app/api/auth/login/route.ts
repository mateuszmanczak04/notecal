import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { comparePasswords } from '@/utils/bcrypt';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { generateToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = body.email;
		const password = body.password;

		if (!email || !password || email.length === 0 || password.length === 0) {
			return Response.json({ error: en.INVALID_CREDENTIALS }, { status: 401 });
		}

		const user = await db.user.findUnique({
			where: { email },
		});

		if (!user) {
			return Response.json({ error: en.INVALID_CREDENTIALS }, { status: 401 });
		}

		if (!(await comparePasswords(password, user.password))) {
			return Response.json({ error: en.INVALID_CREDENTIALS }, { status: 401 });
		}

		const token = await generateToken({ id: user.id });

		const cookieStore = await cookies();
		cookieStore.set('authToken', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7,
		});
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
	redirect(DEFAULT_LOGIN_REDIRECT);
}
