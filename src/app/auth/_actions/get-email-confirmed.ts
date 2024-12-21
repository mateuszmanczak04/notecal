'use server';

const getEmailConfirmed = async () => {
	return { emailConfirmed: false }; // TODO
	// try {
	// 	const session = await auth();

	// 	if (!session?.user) return { error: en.auth.UNAUTHENTICATED };

	// 	const user = await db.user.findUnique({
	// 		where: {
	// 			id: session.user.id,
	// 		},
	// 	});

	// 	return {
	// 		emailConfirmed: user?.emailVerified !== null,
	// 	};
	// } catch (error) {
	// 	return { error: en.SOMETHING_WENT_WRONG };
	// }
};

export default getEmailConfirmed;
