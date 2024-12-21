'use server';

import { en } from '@/lib/dictionary';

const getNotes = async () => {
	try {
		// const session = await auth();

		// if (!session?.user?.id) {
		// 	return { error: en.auth.UNAUTHENTICATED };
		// }

		// let notes = await db.note.findMany({
		// 	where: { userId: session.user.id },
		// 	orderBy: [
		// 		{
		// 			startTime: 'asc',
		// 		},
		// 	],
		// });

		// return { notes };

		return { notes: [] };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getNotes;
