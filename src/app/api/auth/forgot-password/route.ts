import { en } from '@/utils/dictionary';
import { sendConfirmationEmail } from '../send-confirmation-email';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = body.email.trim().toLowerCase();

		if (!email) {
			return Response.json({ error: en.INVALID_DATA }, { status: 400 });
		}

		const result = await sendConfirmationEmail(email);
		const status = result.error ? 400 : 200;
		return Response.json(result, { status });
	} catch (error) {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
}
