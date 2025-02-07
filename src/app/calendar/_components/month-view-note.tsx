'use client';

import NoteContextMenu from '@/app/notes/_components/note-context-menu';
import { useCourses } from '@/hooks/use-courses';
import { useNoteContextMenu } from '@/hooks/use-note-context-menu';
import { Note } from '@prisma/client';
import Link from 'next/link';

type Props = {
	note: Note;
};

const MonthViewNote = ({ note }: Props) => {
	const { data: courses } = useCourses();
	const noteCourse = courses?.find(c => c.id === note.courseId);
	const { closeContextMenu, contextMenuPosition, handleContextMenu } = useNoteContextMenu();

	if (!noteCourse) return;

	return (
		<>
			<Link
				onContextMenu={handleContextMenu}
				href={`/notes?noteId=${note.id}`}
				style={{ backgroundColor: noteCourse.color }}
				className='truncate text-nowrap rounded-md px-2 text-sm text-white'>
				{note.title || noteCourse.name}
			</Link>
			{/* Context menu on right mouse click */}
			{contextMenuPosition && (
				<NoteContextMenu position={contextMenuPosition} note={note} handleClose={closeContextMenu} />
			)}
		</>
	);
};

export default MonthViewNote;
