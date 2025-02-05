'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

export type T_DeleteManyNotesInput = { ids: string[] };

export type T_DeleteManyNotesResult = Promise<{ error: string } | { success: true }>;

const deleteManyNotes = async ({ ids }: T_DeleteManyNotesInput): T_DeleteManyNotesResult => {
	if (!ids) {
		return { error: 'IDs are required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		await Promise.all(
			ids.map(async id => {
				await db.note.delete({
					where: { id, userId: user.id },
				});
			}),
		);

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteManyNotes;
