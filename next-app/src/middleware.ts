import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { FRONTEND_DOMAIN } from './utils/app-domain';

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	// Set CORS headers
	response.headers.set('Access-Control-Allow-Credentials', 'true');
	response.headers.set('Access-Control-Allow-Origin', FRONTEND_DOMAIN);
	response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
	response.headers.set(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	);

	// Handle preflight requests
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			headers: response.headers,
		});
	}

	return response;
}

// specify the path regex to apply the middleware to
export const config = {
	matcher: '/api/:path*',
};
