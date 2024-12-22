export const publicRoutes: string[] = ['/auth/confirm-email'];

export const authRoutes: string[] = [
	'/',
	'/auth/login',
	'/auth/register',
	'/auth/forgot-password',
	'/auth/reset-password',
	'/auth/reset-password/invalid-token',
	'/auth/reset-password/invalid-url',
	'/auth/reset-password/forbidden',
];

export const apiAuthPrefix: string = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT: string = '/calendar';
