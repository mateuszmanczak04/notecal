import { cookies } from 'next/headers';

export async function POST(_request: Request) {
	const cookieStore = await cookies();
	cookieStore.delete('authToken');
	return Response.json({ success: true }, { status: 200 });
}
