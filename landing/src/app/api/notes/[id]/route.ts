import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { generateGetPresignedUrl, generatePutPresignedUrl } from '../../../../../../server/utils/aws';
import { getAuthStatus } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { en } from '../../../../utils/dictionary';

type T_Params = {
	params: Promise<{ id: string }>;
};

/** Get single note */
export const GET = async (_request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		if (!id) return Response.json({ error: 'Invalid note ID' }, { status: 400 });

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) return Response.json({ error: 'Unauthenticated' }, { status: 401 });

		const note = await db.note.findUnique({
			where: {
				id,
				userId: user.id,
			},
		});

		if (!note) return Response.json({ error: 'Note not found' }, { status: 404 });

		const presignedUrlGet = await generateGetPresignedUrl(note.id);
		const presignedUrlPut = await generatePutPresignedUrl(note.id);

		return Response.json({ note, presignedUrlGet, presignedUrlPut }, { status: 200 });
	} catch (error) {
		return Response.json({ error: 'An error occurred' }, { status: 500 });
	}
};

/** Delete single note */
export const DELETE = async (request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		if (!id) {
			return Response.json({ error: 'ID is required' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		const note = await db.note.findUnique({
			where: { id },
		});

		if (!note || !note.userId || note.userId !== user.id) {
			return Response.json({ error: 'Note not found' }, { status: 404 });
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

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};

/** Update single note */
export const PUT = async (request: Request, { params }: T_Params) => {
	try {
		const { id } = await params;

		if (!id) {
			return Response.json({ error: 'ID is required' }, { status: 400 });
		}

		const body = await request.json();
		const { title, startTime, endTime, courseId } = body;

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		const note = await db.note.findUnique({
			where: { id },
		});

		if (!note) {
			return Response.json({ error: 'Note not found' }, { status: 404 });
		}

		const updatedNote = await db.note.update({
			where: { id, userId: user.id },
			data: {
				title,
				startTime,
				endTime,
				courseId,
			},
		});

		return Response.json({ note: updatedNote }, { status: 200 });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
