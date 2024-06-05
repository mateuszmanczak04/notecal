import { z } from 'zod';

const RegisterSchema = z
	.object({
		email: z.string().email({ message: 'Email is required.' }),
		password: z.string().min(6, { message: 'Minimum 6 characters.' }),
		confirmPassword: z.string().min(6, { message: 'Minimum 6 characters.' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword'],
	});

export default RegisterSchema;
