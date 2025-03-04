import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

type T_Params = {
	params: Promise<{ id: string }>;
};

/** Delete course */
export const DELETE = async (_request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		if (!id) {
			return Response.json({ error: 'Course ID is missing' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();
		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		await db.course.delete({ where: { id, userId: user.id } });

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

/** Update course and respond with updated course */
export const PATCH = async (request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		if (!id) {
			return Response.json({ error: 'ID is required' }, { status: 400 });
		}

		const body = await request.json();
		const { name, teacher, color, usefulLinks } = body;

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		if (name && name.trim().length === 0) {
			return Response.json({ error: 'Course name cannot be empty' }, { status: 400 });
		}

		const course = await db.course.update({
			where: { id, userId: user.id },
			data: {
				name,
				teacher,
				color,
				usefulLinks,
			},
		});

		return Response.json({ course }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
