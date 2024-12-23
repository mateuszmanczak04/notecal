import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import Courses from './_components/courses';

export const metadata: Metadata = {
	title: 'Notecal | Courses',
	robots: {
		index: false,
	},
};

const page = () => {
	return (
		<main className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{/* List of courses */}
			<Courses />

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
