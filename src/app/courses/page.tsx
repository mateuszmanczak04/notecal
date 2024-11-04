'use client';

import useCourses from '@/app/courses/_hooks/use-courses';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Course from './_components/course';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Courses',
	robots: {
		index: false,
	},
};

const CoursesPage = () => {
	const { courses, error, isPending } = useCourses();

	return (
		<div>
			{error && <ErrorMessage>{error.message}</ErrorMessage>}

			{isPending && (
				<div className='grid place-content-center'>
					<LoadingSpinner />
				</div>
			)}

			{(!courses || courses.length === 0) && !isPending && (
				<p className='text-center text-lg text-neutral-500 sm:ml-8'>
					You don&apos;t have any courses yet.
				</p>
			)}

			{!isPending && (
				<div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
					{courses?.map(course => (
						<Course
							color={course.color}
							key={course.id}
							id={course.id}
							name={course.name}
							teacher={course.teacher}
						/>
					))}

					<Link
						prefetch
						href='/courses/create'
						className='grid cursor-pointer place-content-center gap-2 rounded-xl bg-neutral-100 p-4 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600'>
						<Plus className='h-10 w-10' />
					</Link>
				</div>
			)}
		</div>
	);
};

export default CoursesPage;
