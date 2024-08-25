'use server';

import { generateVerificationToken } from '@/app/auth/_actions/send-confirmation-email';
import { en } from '@/lib/dictionary';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const Schema = z.object({
	email: z
		.string()
		.trim()
		.email()
		.min(1, { message: en.auth.EMAIL_REQUIRED })
		.email(),
});

const sendEmailChangeEmail = async (values: z.infer<typeof Schema>) => {
	const validatedFields = Schema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

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

		const email = validatedFields.data.email;
		const token = await generateVerificationToken(email);
		const url = `${process.env.APP_DOMAIN}/auth/confirm-email?token=${token.token}`;

		const html = `
     <div
        style="
          font-family: sans-serif;
          padding: 16px;
          border-radius: 16px;
          text-align: center;
          max-width: 400px;
        ">
        <h1 style="font-size: 32px; margin: 0">Confirm your new email address</h1>
        <p style="font-size: 16px; margin: 0; margin-top: 8px">
          Click the button bellow to confirm changes in your account
        </p>
        <a
          href="${url}"
          style="
            margin-top: 16px;
            display: block;
            text-decoration: none;
            background-color: #3b82f6;
            color: #ffffff;
            height: 40px;
            font-size: 16px;
            padding: 0 32px;
            line-height: 40px;
            border-radius: 6px;
            font-family: inherit;
          ">
          Confirm new email
        </a>
      </div>
    `;

		await transporter.sendMail({
			from: 'Notecal <noreply@notecal.app>',
			to: email,
			subject: 'Confirm Your account',
			html,
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default sendEmailChangeEmail;
