import { en } from '@/utils/dictionary';
import { z } from 'zod';

const RegisterSchema = z
	.object({
		email: z.string().trim().email({ message: en.auth.EMAIL_REQUIRED }),
		password: z.string().min(6, { message: en.auth.MIN_PASSWORD_LENGTH }),
		confirmPassword: z.string().min(6, { message: en.auth.MIN_PASSWORD_LENGTH }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: en.auth.PASSWORDS_DO_NOT_MATCH,
		path: ['confirmPassword'],
	});

export default RegisterSchema;
