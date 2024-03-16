import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
	await dbConnect();

	const user = await User.create({
		email: 'mateusz@gmail.com',
		password: 'secret-password',
	});

	return new Response('Hello World', {
		headers: {
			'content-type': 'text/plain',
		},
	});
};
