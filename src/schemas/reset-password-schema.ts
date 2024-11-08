import { en } from '@/lib/dictionary';
import { z } from 'zod';

const ResetPasswordSchema = z
	.object({
		token: z.string().min(1, { message: en.auth.TOKEN_REQUIRED }),
		password: z.string().min(6, { message: en.auth.MIN_PASSWORD_LENGTH }),
		confirmPassword: z.string().min(6, { message: en.auth.MIN_PASSWORD_LENGTH }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: en.auth.PASSWORDS_DO_NOT_MATCH,
		path: ['confirmPassword'],
	});

export default ResetPasswordSchema;
