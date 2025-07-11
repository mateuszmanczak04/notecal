import { useNotes } from '../../../hooks/use-notes';
import LoadingSpinner from '../../loading-spinner';
import { useCalendarContext } from '../context/calendar-context';
import ListViewNote from './list-view-note';

const ListView = () => {
	const { data: notes, isPending: isNotesPending } = useNotes();
	const { hiddenCoursesIds } = useCalendarContext();

	const filteredNotes = notes?.filter(note => hiddenCoursesIds.includes(note.courseId) === false);
	const sortedNotes = filteredNotes?.sort((a, b) => (b.startTime?.getTime() || 0) - (a.startTime?.getTime() || 0));
	const mappedNotes = sortedNotes?.map(note => <ListViewNote key={note.id} note={note} />);

	// Display notes sorted like this:
	// 1. Notes with time ascending
	// 2. Notes without time
	return (
		<div className='flex flex-col items-center gap-2 border-t border-neutral-200 p-4 pt-4 dark:border-transparent'>
			{isNotesPending && (
				<div className='flex items-center gap-2 p-4'>
					<LoadingSpinner /> We are loading your notes...
				</div>
			)}
			{notes?.length === 0 && <p>You don&apos;t have any notes yet</p>}

			{mappedNotes}
		</div>
	);
};

export default ListView;
