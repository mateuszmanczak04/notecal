import { getAuthStatus } from '../../../utils/auth';
import db from '../../../utils/db';
import { en } from '../../../utils/dictionary';
import { logout } from '../../../utils/logout';

export type LimitedUser = {
	id: string;
	email: string;
	emailVerified: boolean;
};

export const GET = async (request: Request) => {
	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) {
			await logout();
			return Response.json({ error: 'User is not authenticated' }, { status: 200 });
		}

		const user = await db.user.findUnique({ where: { id: authUser.id } });

		if (!user) {
			logout();
			return Response.json({ error: 'User not found' }, { status: 200 });
		}

		const limitedUser: LimitedUser = {
			id: user.id,
			email: user.email,
			emailVerified: !!user.emailVerified,
		};

		return Response.json({ user: limitedUser }, { status: 200 });
	} catch {
		// TODO: think about how to fix this issue the better way
		logout();
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
