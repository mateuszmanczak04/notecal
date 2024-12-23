import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import Course from './_components/course';

export const metadata: Metadata = {
	title: 'Notecal | Courses',
	robots: {
		index: false,
	},
};

/**
 * Fetches all user's courses and displays them as a grid.
 */
const page = async () => {
	const { user } = (await getAuthStatus()) as { user: { id: string } };

	const courses = await db.course.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			name: 'asc',
		},
	});

	if (!courses) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any courses yet.</p>;
	}

	return (
		<main className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{/* List of courses */}
			{courses?.map(course => (
				<Course
					color={course.color}
					key={course.id}
					id={course.id}
					name={course.name}
					teacher={course.teacher}
				/>
			))}

			{/* New course button link */}
			<Link
				prefetch
				href='/courses/create'
				className='grid cursor-pointer place-content-center gap-2 rounded-xl bg-neutral-100 p-4 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600'>
				<Plus className='h-10 w-10' />
			</Link>
		</main>
	);
};

export default page;
