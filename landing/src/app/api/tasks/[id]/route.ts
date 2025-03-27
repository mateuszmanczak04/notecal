import { getAuthStatus } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { en } from '../../../../utils/dictionary';

type T_Params = {
	params: Promise<{ id: string }>;
};

export const DELETE = async (_request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		// We don't check if tasks exists and just fake it has been deleted. Thanks to that we don't give any information to mallicious users.

		await db.task.delete({ where: { id, userId: user.id } });

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

export const PATCH = async (request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;
		const body = await request.json();
		const { title, dueDate, description, completed, priority, courseId } = body;

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json(
				{
					error: en.auth.UNAUTHENTICATED,
				},
				{ status: 401 },
			);
		}

		const task = await db.task.update({
			where: { id: id, userId: user.id },
			data: { title, dueDate, description, completed, priority, courseId },
		});

		return Response.json({ task }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
