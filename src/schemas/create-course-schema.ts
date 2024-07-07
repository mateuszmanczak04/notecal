import { z } from 'zod';

const CreateCourseSchema = z.object({
	name: z.string().min(1, { message: 'Course name is required' }).max(60, {
		message: 'Maximum length of the course name is 60 characters',
	}),
	teacher: z.string().min(1, { message: 'Teacher name is required' }).max(40, {
		message: 'Maximum length of the teacher name is 40 characters',
	}),
	// color: z.string().min(1, { message: 'Course color is required' }),
});

export default CreateCourseSchema;
