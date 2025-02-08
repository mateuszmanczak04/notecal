'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { useCalendarContext } from '../_context/calendar-context';
import ListViewNote from './list-view-note';

const ListView = () => {
	const { data: notes } = useNotes();
	const { data: courses } = useCourses();
	const { hiddenCoursesIds } = useCalendarContext();

	if (!courses || !notes) return;

	// Display notes sorted like this:
	// 1. Notes with time ascending
	// 2. Notes without time
	return (
		<div className='flex flex-col items-center gap-2 border-t border-neutral-200 p-4 pt-4 dark:border-transparent'>
			{notes
				.filter(note => hiddenCoursesIds.includes(note.courseId) === false)
				.toSorted((a, b) => (b.startTime?.getTime() || 0) - (a.startTime?.getTime() || 0))
				.map(note => (
					<ListViewNote key={note.id} note={note} />
				))}
		</div>
	);
};

export default ListView;
