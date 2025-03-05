import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

/** Create new course */
export const POST = async (request: Request) => {
	try {
		const body = await request.json();
		const { name, teacher, color } = body;

		if (!name || !teacher || !color) {
			return Response.json({ error: en.INVALID_DATA }, { status: 400 });
		}

		const colorRegex = /^#[0-9A-F]{6}$/i;
		const isValidColor = colorRegex.test(color);

		if (!isValidColor) {
			return Response.json({ error: en.courses.INVALID_COLOR }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		const course = await db.course.create({
			data: {
				userId: user.id,
				name,
				teacher,
				color,
			},
		});

		return Response.json({ course }, { status: 201 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

// TODO: get only general list of courses and fetch specific course when needed (when on its page)
/** Get array of all user's courses */
export const GET = async (request: Request) => {
	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });

		const courses = await db.course.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				name: 'asc',
			},
		});

		return Response.json({ courses }, { status: 200 });
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
