import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().email({ message: 'Email is required.' }),
	password: z.string().min(1, { message: 'Password is required.' }),
});

export default LoginSchema;
