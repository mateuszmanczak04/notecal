'use server';

import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import nodemailer from 'nodemailer';

export const getVerificationTokenByEmail = async (email: string) => {
	const verificationToken = await db.verificationToken.findFirst({
		where: {
			email,
		},
	});
	return verificationToken;
};

export const generateVerificationToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // 1h

	const existingToken = await getVerificationTokenByEmail(email);

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

const sendConfirmationEmail = async (email: string): Promise<{ error?: string; message?: string }> => {
	if (!email) {
		return { error: en.auth.EMAIL_REQUIRED };
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
        <h1 style="font-size: 32px; margin: 0">Confirm your account's e-mal address</h1>
        <p style="font-size: 16px; margin: 0; margin-top: 8px">
          Click the button bellow to go forward
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
          Confirm my e-mail
        </a>
      </div>
    `;

		await transporter.sendMail({
			from: 'Notecal <noreply@notecal.app>',
			to: email,
			subject: 'Confirm Your account',
			html,
		});

		return { message: 'Confirmation message was successfully sent to your inbox' };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

/**
 * The same function as sendConfirmationEmail but can be fires in <form>.
 */
export const sendConfirmationEmailForm = async (_prevState: any, formData: FormData) => {
	const email = formData.get('email')?.toString();

	if (!email) {
		return { error: en.INVALID_DATA };
	}

	return await sendConfirmationEmail(email);
};

export default sendConfirmationEmail;
