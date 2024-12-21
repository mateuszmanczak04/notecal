import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';
import { NextRequest } from 'next/server';

export default (request: NextRequest) => {
	const url = request.nextUrl;

	// TODO: maybe handle it more securely than just checking if cookie exists
	const isLoggedIn = request.cookies.has('authToken');

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
