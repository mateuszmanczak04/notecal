'use server';

import db from '@/lib/db';
import { isAfter } from 'date-fns';
import { redirect } from 'next/navigation';

const confirmEmail = async (formData: FormData) => {
	const token = formData.get('token')?.toString();

	if (!token) {
		redirect('/auth/confirm-email/invalid-token');
	}

	const verificationToken = await db.verificationToken.findFirst({
		where: {
			token,
		},
	});

	if (!verificationToken) {
		redirect('/auth/confirm-email/invalid-token');
	}

	const hasExpired = isAfter(new Date(), verificationToken.expires);

	if (hasExpired) {
		redirect('/auth/confirm-email/invalid-token');
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
		redirect('/auth/confirm-email/invalid-token');
	}

	await db.user.update({
		where: { id: user.id },
		data: { emailVerified: new Date() },
	});

	redirect(`/auth/confirm-email/success?email=${verificationToken.email}`);
};

export default confirmEmail;
