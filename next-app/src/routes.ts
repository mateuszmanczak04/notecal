import { FRONTEND_DOMAIN } from './utils/app-domain';

export const routesForAllUsers: string[] = ['/auth/confirm-email'];

export const routesForUnauthenticatedUsers: string[] = [
	'/',
	'/auth/login',
	'/auth/register',
	'/auth/forgot-password',
	'/auth/reset-password',
];

export const DEFAULT_LOGIN_REDIRECT: string = FRONTEND_DOMAIN + '/calendar';
