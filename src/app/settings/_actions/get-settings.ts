'use server';

import { en } from '@/lib/dictionary';

const getSettings = async () => {
	try {
		// const session = await auth();

		// if (!session?.user?.id) {
		// 	return { error: en.auth.UNAUTHENTICATED };
		// }

		// let settings = await db.settings.findUnique({
		// 	where: { userId: session.user.id },
		// });

		// if (!settings) {
		// 	settings = await db.settings.create({
		// 		data: {
		// 			userId: session.user.id,
		// 		},
		// 	});
		// }

		// return { settings };

		return { settings: null };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getSettings;
