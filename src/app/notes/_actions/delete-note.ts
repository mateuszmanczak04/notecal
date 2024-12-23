'use server';

import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

type T_Input = { id: string };

type T_Result = Promise<{ error: string } | { success: true }>;

const deleteNote = async ({ id }: T_Input): T_Result => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		await db.note.delete({
			where: { id, userId: user.id },
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteNote;
