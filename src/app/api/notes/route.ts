import { getAuthStatus } from '@/utils/auth';
import { generatePutPresignedUrl } from '@/utils/aws';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { getDefaultNewNoteContent } from '@/utils/get-default-new-note-content';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { addMinutes } from 'date-fns';

/** Get all user's notes */
export const GET = async (_request: Request) => {
	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });

		const notes = await db.note.findMany({
			where: {
				userId: user.id,
			},
			orderBy: [
				{
					startTime: {
						sort: 'asc',
						nulls: 'last',
					},
				},
				{
					createdAt: 'desc',
				},
			],
		});

		return Response.json({ notes }, { status: 200 });
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

/** Create new note */
export const POST = async (request: Request) => {
	try {
		const body = await request.json();
		const { courseId, startTime, duration } = body;

		if (!courseId) {
			return Response.json({ error: 'Course ID is required' }, { status: 400 });
		}

		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		// Fetch user's settings to know default note duration
		const user = await db.user.findUnique({
			where: { id: authUser.id },
		});

		// It should not occur in normal conditions
		if (!user) {
			return Response.json({ error: 'User does not exist' }, { status: 404 });
		}

		const actualStartTime = startTime || null;
		let endTime: Date | null = null;
		if (actualStartTime) {
			actualStartTime.setSeconds(0, 0); // Set seconds and milliseconds to 0
			endTime = addMinutes(actualStartTime, duration || 60);
		}

		const note = await db.note.create({
			data: {
				courseId,
				startTime: actualStartTime,
				endTime: endTime,
				userId: authUser.id,
			},
		});

		const uploadLink = await generatePutPresignedUrl(note.id);

		await fetch(uploadLink, {
			method: 'PUT',
			body: getDefaultNewNoteContent(),
		});

		return Response.json({ note }, { status: 201 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

/** Delete multiple notes */
export const DELETE = async (request: Request) => {
	try {
		const body = await request.json();
		const { ids } = body;

		if (!ids) {
			return Response.json({ error: 'IDs are required' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		const client = new S3Client({
			region: 'eu-central-1',
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
			},
		});

		await Promise.all(
			ids.map(async (id: string) => {
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

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
