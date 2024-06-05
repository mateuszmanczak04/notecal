'use server';

import { auth } from '@/auth';
import db from '@/lib/db';

const getNotes = async () => {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		let notes = await db.note.findMany({
			where: { userId: session.user.id },
		});

		return { notes };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default getNotes;
