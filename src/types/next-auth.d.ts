declare module 'next-auth' {
	interface User {
		id?: string;
		email?: string;
	}

	interface Session extends DefaultSession {
		user?: User;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
		email?: string;
	}
}

// todo when back
// send user id to the client with jwt
// and use it to fetch user data
