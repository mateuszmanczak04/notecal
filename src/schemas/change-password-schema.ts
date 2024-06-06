import { z } from 'zod';

const ChangePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, { message: 'Old password is required.' }),
		newPassword: z
			.string()
			.min(6, { message: 'Minimum password length is 6 characters.' }),
		confirmNewPassword: z
			.string()
			.min(6, { message: 'Minimum password length is 6 characters.' }),
	})
	.refine(data => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords do not match.',
		path: ['confirmNewPassword'],
	});

export default ChangePasswordSchema;
