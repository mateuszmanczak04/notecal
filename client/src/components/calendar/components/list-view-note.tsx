import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useCourses } from '../../../hooks/use-courses';
import { T_Note } from '../../../types';

type T_Props = {
	note: T_Note;
};

const ListViewNote = ({ note }: T_Props) => {
	const { data: courses } = useCourses();
	const course = courses?.find(c => c.id === note.courseId);

	return (
		<>
			<Link
				to={`/notes?noteId=${note.id}`}
				className='flex w-[clamp(240px,100%,800px)] items-center justify-between gap-4 rounded-xl p-4 text-white hover:opacity-90'
				style={{ backgroundColor: course?.color }}
				key={note.id}>
				<div className='w-full min-w-0'>
					{note.startTime && note.endTime && (
						<div className='flex gap-2'>
							<p>{format(note.startTime, 'P, HH:MM')}</p>-<p>{format(note.endTime, 'P, HH:MM')}</p>
						</div>
					)}
					{course && course?.name && <p className='mt-2 truncate text-lg'>{course.name}</p>}
					{note.title && <p className='mt-2 truncate text-lg font-semibold'>{note.title}</p>}
					{!!note.content?.length && (
						<p className='mt-2 line-clamp-4 w-full whitespace-pre-line text-sm opacity-75'>
							{note.content}
						</p>
					)}
				</div>
				<ChevronRight className='size-7 shrink-0' />
			</Link>
		</>
	);
};

export default ListViewNote;
