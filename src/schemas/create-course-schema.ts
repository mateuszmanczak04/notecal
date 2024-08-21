import { en } from '@/lib/dictionary';
import { z } from 'zod';

const CreateCourseSchema = z.object({
	name: z.string().min(1, { message: en.courses.NAME_REQUIRED }).max(60, {
		message: en.courses.MAX_NAME_LENGTH,
	}),
	teacher: z
		.string()
		.min(1, { message: en.courses.TEACHER_REQUIRED })
		.max(40, {
			message: en.courses.MAX_TEACHER_NAME_LENGTH,
		}),
	color: z.string().min(1, { message: en.courses.COLOR_REQUIRED }),
});

export default CreateCourseSchema;
