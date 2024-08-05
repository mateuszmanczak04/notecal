'use server';

import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const Schema = z.string().min(1, { message: en.auth.EMAIL_REQUIRED }).email();

export const getResetTokenByEmail = async (email: string) => {
	const resetToken = await db.resetPasswordToken.findFirst({
		where: {
			email,
		},
	});
	return resetToken;
};

const generateResetToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // 1h

	const existingToken = await getResetTokenByEmail(email);

	if (existingToken) {
		await db.resetPasswordToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const resetToken = await db.resetPasswordToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return resetToken;
};

const sendResetPasswordEmail = async (values: z.infer<typeof Schema>) => {
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

		const email = validatedFields.data;
		const token = await generateResetToken(email);
		const url = `${process.env.APP_DOMAIN}/auth/reset-password?token=${token.token}`;

		const html = `
     <div
        style="
          font-family: sans-serif;
          padding: 16px;
          border-radius: 16px;
          text-align: center;
          max-width: 400px;
        ">
        <h1 style="font-size: 32px; margin: 0">Recover access to your account</h1>
        <p style="font-size: 16px; margin: 0; margin-top: 8px">
          Hi ${email}, click the button bellow to reset your password
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
          Click
        </a>
      </div>
    `;

		await transporter.sendMail({
			from: 'Notecal <noreply@notecal.app>',
			to: email,
			subject: 'Reset your password',
			html,
		});

		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default sendResetPasswordEmail;
