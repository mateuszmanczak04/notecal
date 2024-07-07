import { en } from '@/lib/dictionary';
import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

const CreateTaskSchema = z.object({
	title: z.string().min(1, { message: en.tasks.TITLE_REQUIRED }).max(60, {
		message: en.tasks.MAX_TITLE_LENGTH,
	}),
	description: z.string().max(300, {
		message: en.tasks.MAX_DESCRIPTION_LENGTH,
	}),
	courseId: z.string().nullable(),
	priority: z.enum([TaskPriority.A, TaskPriority.B, TaskPriority.C]).nullable(),
	dueDate: z.date().nullable(),
	completed: z.boolean().optional(),
});

export default CreateTaskSchema;
