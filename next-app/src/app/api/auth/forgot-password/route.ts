import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import nodemailer from 'nodemailer';

/**
 * Query to the database to find a ResetPasswordToken by email.
 */
const getResetTokenByEmail = async (email: string) => {
	const resetToken = await db.resetPasswordToken.findFirst({
		where: { email },
	});
	return resetToken;
};

/**
 * Deletes an existing token (if any) and creates a new reset token.
 */
const generateResetToken = async (email: string) => {
	const token = crypto.randomUUID();
	const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

	const existingToken = await getResetTokenByEmail(email);
	if (existingToken) {
		await db.resetPasswordToken.delete({
			where: { id: existingToken.id },
		});
	}

	const resetToken = await db.resetPasswordToken.create({
		data: { email, token, expires },
	});

	return resetToken;
};

/**
 * Route handler for sending a recovery email.
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = body.email.trim().toLowerCase();

		if (!email || email.length === 0) {
			return Response.json({ error: 'Invalid email provided.' }, { status: 400 });
		}

		const user = await db.user.findUnique({ where: { email } });

		// If user doesn't exist or email isn't verified, fake success response.
		if (!user || !user.emailVerified) {
			return Response.json({ message: 'Email sent successfully, please check your inbox.' }, { status: 200 });
		}

		// Setup nodemailer transporter.
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// Generate reset token.
		const tokenData = await generateResetToken(email);
		const url = `${process.env.APP_DOMAIN}/auth/reset-password?token=${tokenData.token}&email=${email}`;

		// Email template.
		const html = `
            <div
                style="
                    font-family: sans-serif;
                    padding: 16px;
                    border-radius: 16px;
                    text-align: center;
                    max-width: 400px;">
                <h1 style="font-size: 32px; margin: 0">Recover access to your account</h1>
                <p style="font-size: 16px; margin: 0; margin-top: 8px">
                    Hi ${email}, click the button below to reset your password
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
                        font-family: inherit;">
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

		return Response.json(
			{ message: 'Recovery email sent successfully, please check your inbox.' },
			{ status: 200 },
		);
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}
