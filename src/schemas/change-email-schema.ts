import { en } from '@/lib/dictionary';
import { z } from 'zod';

const ChangeEmailSchema = z.object({
	password: z.string().min(1, { message: en.auth.OLD_PASSWORD_REQUIRED }),
	email: z.string().min(1, { message: en.auth.EMAIL_REQUIRED }),
});

export default ChangeEmailSchema;
