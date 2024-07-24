'use server';

import { en } from '@/lib/dictionary';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import db from '@/lib/db';

const Schema = z.object({
	email: z.string().min(1, { message: en.auth.EMAIL_REQUIRED }).email(),
});

export const getVerficationTokenByEmail = async (email: string) => {
	const verificationToken = await db.verificationToken.findFirst({
		where: {
			email,
		},
	});
	return verificationToken;
};

const generateVerificationToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // 1h

	const existingToken = await getVerficationTokenByEmail(email);

	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationToken;
};

const sendConfirmationEmail = async (values: z.infer<typeof Schema>) => {
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
        <h1 style="font-size: 32px; margin: 0">Confirm account creation</h1>
        <p style="font-size: 16px; margin: 0; margin-top: 8px">
          Click the button bellow to confirm Your new account
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
			subject: 'Confirm Your account',
			html,
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default sendConfirmationEmail;
