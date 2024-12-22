import LoadingSpinner from '@/components/common/loading-spinner';
import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Courses from './_components/courses';

export const metadata: Metadata = {
	title: 'Courses',
	robots: {
		index: false,
	},
};

const page = async () => {
	const { user } = (await getAuthStatus()) as { user: { id: string } };

	const coursesPromise = db.course.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			name: 'asc',
		},
	});

	return (
		<main>
			<Suspense fallback={<LoadingSpinner />}>
				<Courses coursesPromise={coursesPromise} />
			</Suspense>
		</main>
	);
};

export default page;
