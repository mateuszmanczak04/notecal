import { en } from '@/utils/dictionary';
import { z } from 'zod';

const UpdateCourseSchema = z.object({
	id: z.string().min(1, { message: en.courses.ID_REQUIRED }),
	name: z
		.string()
		.min(1, { message: en.courses.NAME_REQUIRED })
		.max(60, {
			message: en.courses.MAX_NAME_LENGTH,
		})
		.optional(),
	teacher: z
		.string()
		.min(1, { message: en.courses.TEACHER_REQUIRED })
		.max(40, {
			message: en.courses.MAX_TEACHER_NAME_LENGTH,
		})
		.optional(),
	color: z.string().min(1, { message: en.courses.COLOR_REQUIRED }).optional(),
});

export default UpdateCourseSchema;
