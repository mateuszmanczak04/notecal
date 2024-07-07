import { en } from '@/lib/dictionary';
import { z } from 'zod';

const UpdateCourseSchema = z.object({
	id: z.string().min(1, { message: en.courses.ID_REQUIRED }),
	newName: z.string().min(1, { message: en.courses.NAME_REQUIRED }).max(60, {
		message: en.courses.MAX_NAME_LENGTH,
	}),
	newTeacher: z
		.string()
		.min(1, { message: en.courses.TEACHER_REQUIRED })
		.max(40, {
			message: en.courses.MAX_TEACHER_NAME_LENGTH,
		}),
});

export default UpdateCourseSchema;
