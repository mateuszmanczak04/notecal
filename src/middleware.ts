import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';
import { NextRequest } from 'next/server';
import { checkAuthenticated } from './lib/auth';

/**
 * Checks if user is authenticated and redirect them to proper url if he wants to visit forbidden page.
 */
export default async (request: NextRequest) => {
	const url = request.nextUrl;

	// Check if user is logged in
	// TODO: maybe handle it more securely than just checking if cookie exists
	const isLoggedIn = await checkAuthenticated();

	// Check path conditions
	const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(url.pathname);
	const isAuthRoute = authRoutes.includes(url.pathname);

	if (isApiAuthRoute) {
		return;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('/auth/login', url));
	}

	return;
};

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
