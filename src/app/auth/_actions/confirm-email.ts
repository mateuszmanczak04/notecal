'use server';

import db from '@/lib/db';
import { isAfter } from 'date-fns';
import { redirect } from 'next/navigation';

const confirmEmail = async (formData: FormData) => {
	const token = formData.get('token')?.toString();

	if (!token) {
		redirect('/auth/confirm-email?error=Invalid token');
	}

	const verificationToken = await db.verificationToken.findFirst({
		where: {
			token,
		},
	});

	if (!verificationToken) {
		redirect('/auth/confirm-email?error=Invalid token');
	}

	const hasExpired = isAfter(new Date(), verificationToken.expires);

	if (hasExpired) {
		redirect('/auth/confirm-email?error=Your token has expired');
	}

	await db.verificationToken.delete({
		where: {
			id: verificationToken.id,
		},
	});

	const user = await db.user.findUnique({
		where: { email: verificationToken.email },
	});

	if (!user) {
		redirect('/auth/confirm-email?error=Invalid token');
	}

	await db.user.update({
		where: { id: user.id },
		data: { emailVerified: new Date() },
	});

	redirect('/auth/confirm-email?message=E-mail address confirmed successully, you can now close this page');
};

export default confirmEmail;
