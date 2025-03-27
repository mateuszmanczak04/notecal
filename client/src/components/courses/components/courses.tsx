import { ChevronRight } from 'lucide-react';
import { useCourses } from '../../../hooks/use-courses';
import Course from './course';

export const CoursesSkeleton = () => {
	return (
		<>
			{[...Array(10)].map((_, index) => (
				<div
					key={index}
					className='flex animate-pulse select-none items-center justify-between rounded-xl bg-neutral-100 p-4 text-white transition hover:opacity-90 dark:bg-neutral-700'>
					<div className='flex-1 overflow-x-hidden'>
						<p className='h-6 w-full truncate rounded-md bg-neutral-200 text-xl font-medium dark:bg-neutral-600'></p>
						<p className='mt-1 h-4 truncate rounded-md bg-neutral-200 opacity-75 dark:bg-neutral-600'></p>
					</div>
					<ChevronRight className='h-10 w-10 text-neutral-300 dark:text-neutral-500' />
				</div>
			))}
		</>
	);
};

const Courses = () => {
	const { data: courses, isPending } = useCourses();

	if (isPending) return <CoursesSkeleton />;

	if (!courses) return;

	return courses.map(course => <Course course={course} key={course.id} />);
};

export default Courses;
