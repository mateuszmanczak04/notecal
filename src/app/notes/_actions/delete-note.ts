'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

export type T_DeleteNoteInput = { id: string };

export type T_DeleteNoteResult = Promise<{ error: string } | { success: true }>;

const deleteNote = async ({ id }: T_DeleteNoteInput): T_DeleteNoteResult => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const note = await db.note.findUnique({
			where: { id },
		});

		if (!note) return { error: 'Note not found' };

		if (!note.userId || note.userId !== user.id) {
			return { error: 'Note not found' };
		}

		await db.note.delete({
			where: { id },
		});

		const client = new S3Client({
			region: 'eu-central-1',
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
			},
		});

		const command = new DeleteObjectCommand({
			Bucket: 'notecal',
			Key: `notes/${id}.json`,
		});

		await client.send(command);

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteNote;
