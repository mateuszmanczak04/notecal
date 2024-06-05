import { z } from 'zod';

const CreateCourseSchema = z.object({
	name: z.string().min(1, { message: 'Course name is required.' }).max(30, {
		message: 'Maximum length of the course name is 30 characters.',
	}),
	teacher: z.string().min(1, { message: 'Teacher name is required.' }).max(30, {
		message: 'Maximum length of the teacher name is 30 characters.',
	}),
});

export default CreateCourseSchema;
