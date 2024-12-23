import { en } from '@/utils/dictionary';
import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().trim().email({ message: en.auth.EMAIL_REQUIRED }),
	password: z.string().min(1, { message: en.auth.PASSWORD_REQUIRED }),
});

export default LoginSchema;
