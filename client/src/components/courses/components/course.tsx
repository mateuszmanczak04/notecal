import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { T_Course } from '../../../types';

type Props = {
	course: T_Course;
};

/**
 * A link navigating to the latest note from it's course.
 */
const Course = ({ course }: Props) => {
	return (
		<Link
			to={`/notes?courseId=${course.id}`}
			className='flex select-none items-center justify-between rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: course.color }}>
			<div className='flex-1 overflow-x-hidden'>
				<p className='truncate rounded-xl text-xl font-medium'>{course.name}</p>
				<p className='mt-1 truncate opacity-75'>{course.teacher}</p>
			</div>
			<ChevronRight className='h-10 w-10' />
		</Link>
	);
};

export default Course;
