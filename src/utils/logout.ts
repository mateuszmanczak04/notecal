'server-only';

import { cookies } from 'next/headers';

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete('authToken');
	return Response.json({ success: true }, { status: 200 });
};
