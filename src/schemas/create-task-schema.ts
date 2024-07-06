import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

const CreateTaskSchema = z.object({
	title: z.string().min(1, { message: 'Task title is required' }).max(60, {
		message: 'Max length is 60 characters',
	}),
	description: z.string().max(300, {
		message: 'Max length is 300 characters',
	}),
	courseId: z.string().nullable(),
	priority: z.enum([TaskPriority.A, TaskPriority.B, TaskPriority.C]).nullable(),
	dueDate: z.date().nullable(),
	completed: z.boolean().optional(),
});

export default CreateTaskSchema;
