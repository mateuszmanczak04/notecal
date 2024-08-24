'use client';

import useCourses from '@/app/courses/_hooks/use-courses';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Course from './_components/course';

const CoursesPage = () => {
	const { courses, error, isPending } = useCourses();

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!courses || courses.length === 0) {
		return (
			<p className='text-lg text-neutral-500'>
				You don&apos;t have any courses yet.
			</p>
		);
	}

	return (
		<div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			{courses.map(course => (
				<Course
					color={course.color}
					key={course.id}
					id={course.id}
					name={course.name}
					teacher={course.teacher}
				/>
			))}

			<Link
				href='/courses/create'
				className='grid cursor-pointer place-content-center gap-2 rounded-xl bg-neutral-100 p-4 transition hover:bg-neutral-200'>
				<Plus className='h-10 w-10' />
			</Link>
		</div>
	);
};

export default CoursesPage;
