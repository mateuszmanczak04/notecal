import { en } from '@/lib/dictionary';
import { z } from 'zod';

const ChangePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, { message: en.auth.OLD_PASSWORD_REQUIRED }),
		newPassword: z.string().min(6, { message: en.auth.MIN_PASSWORD_LENGTH }),
		confirmNewPassword: z.string().min(6, { message: en.auth.MIN_PASSWORD_LENGTH }),
	})
	.refine(data => data.newPassword === data.confirmNewPassword, {
		message: en.auth.PASSWORDS_DO_NOT_MATCH,
		path: ['confirmNewPassword'],
	});

export default ChangePasswordSchema;
