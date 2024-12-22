'use client';

import { Course as T_Course } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import Course from './course';

type Props = {
	coursesPromise: Promise<T_Course[]>;
};

const Courses = ({ coursesPromise }: Props) => {
	const courses = use(coursesPromise);

	if (!courses) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any courses yet.</p>;
	}

	return (
		<>
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
		</>
	);
};

export default Courses;
