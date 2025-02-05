import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';
import { NextRequest } from 'next/server';
import { getAuthStatus } from './utils/auth';

/**
 * Checks if user is authenticated and redirect them to proper url if he wants to visit forbidden page.
 */
export default async (request: NextRequest) => {
	const url = request.nextUrl;

	// Check if user is logged in
	const { authenticated } = await getAuthStatus();

	// Check path conditions
	const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(url.pathname);
	const isAuthRoute = authRoutes.includes(url.pathname);

	if (isApiAuthRoute) {
		return;
	}

	if (isAuthRoute) {
		if (authenticated) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url.toString()));
		}
		return;
	}

	if (!authenticated && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', url.toString()));
	}

	return;
};

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
