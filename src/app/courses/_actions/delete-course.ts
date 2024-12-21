'use server';

import { en } from '@/lib/dictionary';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const DeleteCourseSchema = z.object({
	id: z.string().min(1, { message: en.courses.ID_REQUIRED }),
});

const deleteCourse = async (values: z.infer<typeof DeleteCourseSchema>) => {
	const validatedFields = DeleteCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const id = validatedFields.data.id;

	try {
		// const session = await auth();
		// if (!session?.user?.id) {
		// 	return { error: en.auth.UNAUTHENTICATED };
		// }
		// await db.course.delete({ where: { id, userId: session.user.id } });
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}

	redirect('/courses');
};

export default deleteCourse;
