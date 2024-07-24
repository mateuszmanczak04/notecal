'use server';

import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const Schema = z.object({
	token: z.string().min(1, { message: en.auth.TOKEN_REQUIRED }),
});

const confirmEmail = async (values: z.infer<typeof Schema>) => {
	const validatedFields = Schema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const token = validatedFields.data.token;

	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: {
				token,
			},
		});

		if (!verificationToken) {
			return { error: en.auth.INVALID_TOKEN };
		}

		const hasExpires = Date.now() < verificationToken.expires.getTime();

		if (hasExpires) {
			return { error: en.auth.TOKEN_EXPIRED };
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
			return { error: en.auth.INVALID_TOKEN };
		}

		await db.user.update({
			where: { id: user.id },
			data: { emailVerified: new Date() },
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default confirmEmail;
