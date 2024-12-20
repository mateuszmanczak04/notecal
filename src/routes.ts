export const publicRoutes: string[] = ['/auth/confirm-email'];

export const authRoutes: string[] = [
	'/',
	'/auth/login',
	'/auth/register',
	'/auth/forgot-password',
	'/auth/forgot-password/message-sent',
	'/auth/forgot-password/error',
	'/auth/reset-password',
];

export const apiAuthPrefix: string = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT: string = '/calendar';
