import { Link } from 'react-router';
import { useCourses } from '../../../hooks/use-courses';
import { T_Note } from '../../../types';

type Props = {
	note: T_Note;
};

const MonthViewNote = ({ note }: Props) => {
	const { data: courses } = useCourses();
	const noteCourse = courses?.find(c => c.id === note.courseId);

	if (!noteCourse) return;

	return (
		<>
			<Link
				to={`/notes?noteId=${note.id}`}
				style={{ backgroundColor: noteCourse.color }}
				className='truncate text-nowrap rounded-md px-2 text-sm text-white'>
				{note.title || noteCourse.name}
			</Link>
		</>
	);
};

export default MonthViewNote;
