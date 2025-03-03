import { getAuthStatus } from '@/utils/auth';
import { comparePasswords, hashPassword } from '@/utils/bcrypt';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const oldPassword = body.oldPassword;
		const newPassword = body.newPassword;

		if (!oldPassword || !newPassword) {
			return Response.json({ error: en.INVALID_DATA }, { status: 400 });
		}

		const { authenticated, user: authUser } = await getAuthStatus();
		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		const user = await db.user.findUnique({
			where: { id: authUser.id },
			select: { password: true },
		});

		if (!user || !user.password) {
			return Response.json({ error: en.auth.USER_DOES_NOT_EXIST }, { status: 404 });
		}

		const passwordsMatch = await comparePasswords(oldPassword, user.password);
		if (!passwordsMatch) {
			return Response.json({ error: en.auth.WRONG_PASSWORD }, { status: 403 });
		}

		const hashedPassword = await hashPassword(newPassword);
		await db.user.update({
			where: { id: authUser.id },
			data: { password: hashedPassword },
		});

		return Response.json({ message: en.auth.PASSWORD_UPDATED }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}
