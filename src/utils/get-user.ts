'server-only';

/**
 * A set of database queries which are memoized at the request (wrapped with React.cache). Only use in server components to load initial data.
 */
import { cache } from 'react';
import { getAuthStatus } from './auth';
import db from './db';

export const getUser = cache(async () => {
	const { authenticated, user: authUser } = await getAuthStatus();

	if (!authenticated) return null;

	const user = await db.user.findUnique({ where: { id: authUser.id } });

	return user;
});
