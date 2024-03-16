import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest } from 'next';

export const POST = async (req: NextApiRequest) => {
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
