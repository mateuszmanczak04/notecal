import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_LOGIN_REDIRECT } from '../../../../routes';

export async function POST(_request: Request) {
	const cookieStore = await cookies();
	cookieStore.delete('authToken');
	redirect(DEFAULT_LOGIN_REDIRECT);
}
