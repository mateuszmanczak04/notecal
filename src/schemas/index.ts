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
	priority: z
		.enum([TaskPriority.high, TaskPriority.medium, TaskPriority.low])
		.optional(),
	dueDate: z.date().optional(),
	completed: z.boolean().optional(),
});

export const CompleteTaskSchema = z.object({
	id: z.string(),
	newValue: z.boolean(),
});

export const DeleteTaskSchema = z.object({
	id: z.string(),
});
