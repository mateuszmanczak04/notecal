'use server';

import { en } from '@/lib/dictionary';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const Schema = z.object({
	email: z.string().min(1, { message: en.auth.EMAIL_REQUIRED }).email(),
});

const sendConfirmationEmail = async (values: z.infer<typeof Schema>) => {
	const validatedFields = Schema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const url = 'x';

	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const info = await transporter.sendMail({
			from: 'Notecal <noreply@notecal.app>',
			to: validatedFields.data.email,
			subject: 'Confirm Your account',
			html: '<p>Click <a href="${url}">here</a> to confirm your account creation</p>',
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default sendConfirmationEmail;
