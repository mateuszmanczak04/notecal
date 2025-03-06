import { NavLink } from 'react-router';
import { useCourses } from '../../../hooks/use-courses';
import { T_Note } from '../../../types';
import NoteContextMenu from '../../notes/components/context-menu/note-context-menu';
import { useNoteContextMenu } from '../../notes/components/context-menu/use-note-context-menu';

type Props = {
	note: T_Note;
};

const MonthViewNote = ({ note }: Props) => {
	const { data: courses } = useCourses();
	const noteCourse = courses?.find(c => c.id === note.courseId);
	const { closeContextMenu, contextMenuPosition, handleContextMenu } = useNoteContextMenu();

	if (!noteCourse) return;

	return (
		<>
			<NavLink
				onContextMenu={handleContextMenu}
				to={`/notes?noteId=${note.id}`}
				style={{ backgroundColor: noteCourse.color }}
				className='truncate text-nowrap rounded-md px-2 text-sm text-white'
			>
				{note.title || noteCourse.name}
			</NavLink>
			{/* Context menu on right mouse click */}
			{contextMenuPosition && (
				<NoteContextMenu position={contextMenuPosition} note={note} handleClose={closeContextMenu} />
			)}
		</>
	);
};

export default MonthViewNote;
