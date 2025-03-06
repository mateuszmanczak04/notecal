import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useCourses } from '../../../hooks/use-courses';
import { T_Note } from '../../../types';
import NoteContextMenu from '../../notes/components/context-menu/note-context-menu';
import { useNoteContextMenu } from '../../notes/components/context-menu/use-note-context-menu';
import { parseLexicalJsonToPlainText } from '../../notes/components/editor/parse-lexical-json-to-plain-text';
import { getNoteContent } from '../../notes/utils/get-note-content';

type T_Props = {
	note: T_Note;
};

const ListViewNote = ({ note }: T_Props) => {
	const { data: courses } = useCourses();
	const { closeContextMenu, contextMenuPosition, handleContextMenu } = useNoteContextMenu();
	const [content, setContent] = useState<string | null>(null);
	const [isContentFetching, setIsContentFetching] = useState(false);

	useEffect(() => {
		setIsContentFetching(true);
		getNoteContent(note.id)
			.then(setContent)
			.then(() => setIsContentFetching(false));
	}, [note.id]);

	const course = courses?.find(c => c.id === note.courseId);

	return (
		<>
			<NavLink
				onContextMenu={handleContextMenu}
				to={`/notes?noteId=${note.id}`}
				className='flex w-[clamp(240px,100%,800px)] items-center justify-between gap-4 rounded-xl p-4 text-white hover:opacity-90'
				style={{ backgroundColor: course?.color }}
				key={note.id}
			>
				<div className='w-full min-w-0'>
					{note.startTime && note.endTime && (
						<div className='flex gap-2'>
							<p>{format(note.startTime, 'P, HH:MM')}</p>-<p>{format(note.endTime, 'P, HH:MM')}</p>
						</div>
					)}
					{course && course?.name && <p className='mt-2 truncate text-lg'>{course.name}</p>}
					{note.title && <p className='mt-2 truncate text-lg font-semibold'>{note.title}</p>}
					{isContentFetching && <p className='mt-2 h-4 w-full animate-pulse rounded-md bg-white/25'></p>}
					{content && (
						<p className='mt-2 line-clamp-4 w-full whitespace-pre-line text-sm opacity-75'>
							{parseLexicalJsonToPlainText(JSON.parse(content))}
						</p>
					)}
				</div>
				<ChevronRight className='size-7 shrink-0' />
			</NavLink>
			{/* Context menu on right mouse click */}
			{contextMenuPosition && (
				<NoteContextMenu handleClose={closeContextMenu} note={note} position={contextMenuPosition} />
			)}
		</>
	);
};

export default ListViewNote;
