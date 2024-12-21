'use server';

import { en } from '@/lib/dictionary';

const getCourses = async () => {
	try {
		// const session = await auth();

		// if (!session?.user?.id) {
		// 	return { error: en.auth.UNAUTHENTICATED };
		// }

		// const courses = await db.course.findMany({
		// 	where: {
		// 		userId: session?.user?.id,
		// 	},
		// 	orderBy: {
		// 		name: 'asc',
		// 	},
		// });

		// return { courses };

		return { courses: [] };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getCourses;
