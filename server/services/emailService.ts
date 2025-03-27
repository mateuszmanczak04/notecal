'server-only';

import nodemailer from 'nodemailer';
import { CLIENT_DOMAIN } from '../config/constants';
import db from '../prisma/db';

const getVerificationTokenByEmail = async (email: string) => {
	const verificationToken = await db.verificationToken.findFirst({
		where: { email },
	});
	return verificationToken;
};

const generateVerificationToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(new Date().getTime() + 3600 * 1000); // 1h

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db.verificationToken.delete({
			where: { id: existingToken.id },
		});
	}

	const verificationToken = await db.verificationToken.create({
		data: { email, token, expires },
	});

	return verificationToken;
};

export const sendConfirmationEmail = async (email: string): Promise<{ error?: string; message?: string }> => {
	if (!email) {
		return { error: 'Email is required.' };
	}

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
	const url = `${CLIENT_DOMAIN}/auth/confirm-email?token=${token.token}`;

	const html = `
            <div style="
                    font-family: sans-serif;
                    padding: 16px;
                    border-radius: 16px;
                    text-align: center;
                    max-width: 400px;">
                <h1 style="font-size: 32px; margin: 0">Confirm your account's e-mail address</h1>
                <p style="font-size: 16px; margin: 0; margin-top: 8px">
                    Click the button below to go forward
                </p>
                <a href="${url}" style="
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
                        font-family: inherit;">
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

	return { message: 'Confirmation message was successfully sent to your inbox.' };
};
