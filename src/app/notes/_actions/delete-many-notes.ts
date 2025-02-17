'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

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

		const client = new S3Client({
			region: 'eu-central-1',
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
			},
		});

		await Promise.all(
			ids.map(async id => {
				await db.note.delete({
					where: { id, userId: user.id },
				});

				const command = new DeleteObjectCommand({
					Bucket: 'notecal',
					Key: `notes/${id}.json`,
				});

				await client.send(command);
			}),
		);

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteManyNotes;
