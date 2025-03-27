import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const generatePutPresignedUrl = async (noteId: string) => {
	const client = new S3Client({
		region: 'eu-central-1',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	});

	const command = new PutObjectCommand({
		Bucket: 'notecal',
		Key: `notes/${noteId}.json`,
		ContentType: 'application/json',
	});

	const url = await getSignedUrl(client, command, { expiresIn: 3600 });
	return url;
};

export const generateGetPresignedUrl = async (noteId: string) => {
	const client = new S3Client({
		region: 'eu-central-1',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		},
	});

	const command = new GetObjectCommand({
		Bucket: 'notecal',
		Key: `notes/${noteId}.json`,
	});

	const url = await getSignedUrl(client, command, { expiresIn: 3600 });
	return url;
};
