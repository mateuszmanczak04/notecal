import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

export const RegisterSchema = z
	.object({
		email: z.string().email({ message: 'Email is required.' }),
		password: z.string().min(6, { message: 'Minimum 6 characters.' }),
		confirmPassword: z.string().min(6, { message: 'Minimum 6 characters.' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword'],
	});

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Email is required.' }),
	password: z.string().min(1, { message: 'Password is required.' }),
});

export const CreateCourseFormSchema = z.object({
	name: z.string().min(1, { message: 'Course name is required.' }).max(30, {
		message: 'Maximum length of the course name is 30 characters.',
	}),
	teacher: z.string().min(1, { message: 'Teacher name is required.' }).max(30, {
		message: 'Maximum length of the teacher name is 30 characters.',
	}),
});

export const EditCourseFormSchema = z.object({
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

export const CreateTaskFormSchema = z.object({
	title: z.string().min(1, { message: 'Task title is required.' }).max(60, {
		message: 'Max length is 60 characters.',
	}),
	description: z
		.string()
		.max(300, {
			message: 'Max length is 300 characters',
		})
		.optional(),
	courseId: z.string(),
	priority: z.enum([TaskPriority.A, TaskPriority.B, TaskPriority.C]).nullable(),
	dueDate: z.date().nullable(),
	completed: z.boolean().optional(),
});

export const CompleteTaskSchema = z.object({
	id: z.string(),
	newValue: z.boolean(),
});

export const DeleteTaskSchema = z.object({
	id: z.string(),
});

export const UpdateTaskNameSchema = z.object({
	id: z.string(),
	newTitle: z.string().min(1, { message: 'Title is required.' }),
});

export const UpdateTaskDescriptionSchema = z.object({
	id: z.string(),
	newDescription: z.string(),
});

export const UpdateTaskDueDateSchema = z.object({
	id: z.string(),
	newDueDate: z.string().nullable(),
});

export const UpdateTaskCourseIdSchema = z.object({
	id: z.string(),
	newCourseId: z.string().nullable(),
});

export const UpdateTaskPrioritySchema = z.object({
	id: z.string(),
	newPriority: z
		.enum([TaskPriority.A, TaskPriority.B, TaskPriority.C])
		.nullable(),
});

export const DeleteCourseSchema = z.object({
	id: z.string(),
});

export const GetTasksSchema = z.object({});

export const UpdateSettingsSchema = z.object({
	theme: z.enum(['light', 'dark']).optional(),
	orderTasks: z
		.enum(['title', 'createdAt', 'dueDate', 'priority', 'completed'])
		.optional(),
	language: z.enum(['en']).optional(),
});

export const GetNoteSchema = z.object({
	id: z.string(),
});

export const GetCourseNotesSchema = z.object({
	courseId: z.string(),
});
