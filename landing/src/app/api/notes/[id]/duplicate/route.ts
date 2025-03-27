import { getAuthStatus } from '../../../../../utils/auth';
import db from '../../../../../utils/db';
import { en } from '../../../../../utils/dictionary';

type T_Params = {
	params: Promise<{ id: string }>;
};

/** Duplicate note */
export const POST = async (_request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		if (!id) {
			return Response.json({ error: 'ID is required' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		const note = await db.note.findUnique({
			where: { id },
		});

		if (!note) {
			return Response.json({ error: 'Note not found' }, { status: 404 });
		}

		const newNote = await db.note.create({
			data: {
				title: note.title + '(copy)',
				startTime: note.startTime,
				endTime: note.endTime,
				courseId: note.courseId,
				userId: user.id,
			},
		});

		return Response.json({ note: newNote }, { status: 201 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
