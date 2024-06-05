import { z } from 'zod';

const UpdateCourseSchema = z.object({
	id: z.string().min(1, { message: 'Course id id required.' }),
	newName: z.string().min(1, { message: 'Course name is required.' }).max(30, {
		message: 'Maximum length of the course name is 30 characters.',
	}),
	newTeacher: z
		.string()
		.min(1, { message: 'Teacher name is required.' })
		.max(30, {
			message: 'Maximum length of the teacher name is 30 characters.',
		}),
});

export default UpdateCourseSchema;
