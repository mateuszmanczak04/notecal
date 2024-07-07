import { en } from '@/lib/dictionary';
import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().email({ message: en.auth.EMAIL_REQUIRED }),
	password: z.string().min(1, { message: en.auth.PASSWORD_REQUIRED }),
});

export default LoginSchema;
