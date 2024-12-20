export const publicRoutes: string[] = [
	'/auth/confirm-email',
	'/auth/confirm-email/invalid-token',
	'/auth/confirm-email/success',
];

export const authRoutes: string[] = [
	'/',
	'/auth/login',
	'/auth/register',
	'/auth/forgot-password',
	'/auth/forgot-password/message-sent',
	'/auth/forgot-password/error',
	'/auth/reset-password',
	'/auth/reset-password/invalid-token',
	'/auth/reset-password/invalid-url',
	'/auth/reset-password/forbidden',
];

export const apiAuthPrefix: string = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT: string = '/calendar';
