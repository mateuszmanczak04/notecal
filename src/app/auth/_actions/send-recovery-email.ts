import db from '@/lib/db';
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';

/**
 * Simple query to the database to find a ResetPasswordToken by an email.
 */
const getResetTokenByEmail = async (email: string) => {
	const resetToken = await db.resetPasswordToken.findFirst({
		where: {
			email,
		},
	});
	return resetToken;
};

/**
 * If there is a token associated with this email, it becomes deleted and replaced with new one. If not, simply return the token.
 */
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

/**
 * An action invoked after form submission. It sends the recovery email to the user.
 */
const sendRecoveryEmail = async (formData: FormData) => {
	'use server';
	// Validate the email
	const email = formData.get('email')?.toString().trim();
	if (!email || email.length === 0) return;

	const user = await db.user.findUnique({ where: { email } });

	// Check if user exists and has email verified,
	// if not, fake that action resolved successfully
	if (!user || !user.emailVerified) {
		redirect(`/auth/forgot-password/message-sent?email=${email}`);
	}

	// Setup nodemailer
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	// Generate the reset token
	const token = await generateResetToken(email);
	const url = `${process.env.APP_DOMAIN}/auth/reset-password?token=${token.token}&email=${email}`;

	// Email template
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

	// Send email and display error message if something goes wrong
	try {
		transporter.sendMail({
			from: 'Notecal <noreply@notecal.app>',
			to: email,
			subject: 'Reset your password',
			html,
		});
	} catch {
		redirect('/auth/forgot-password/error');
	}

	redirect(`/auth/forgot-password/message-sent?email=${email}`);
};

export default sendRecoveryEmail;
