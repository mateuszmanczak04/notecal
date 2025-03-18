import { format } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { T_Note } from '../../../../../types';
import { cn } from '../../../../../utils/cn';
import NoteMenu from '../../context-menu/note-menu';
import { useSelectedNotes } from './selected-notes-context';

type Props = {
	note: T_Note;
};

/**
 * Single note link used in /notes/[id] page as side note
 */
const SideNoteItem = ({ note }: Props) => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const noteId = searchParams.get('noteId');
	const { deselectAll, deselectNote, selectNote, isNoteSelected } = useSelectedNotes();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);

	const handleClick = (e: React.MouseEvent) => {
		if (e.metaKey) {
			e.preventDefault();
			if (isNoteSelected(note)) {
				deselectNote(note);
			} else {
				selectNote(note);
			}
		} else {
			deselectAll();
			selectNote(note);
			navigate(`/notes?noteId=${note.id}`);
		}
	};

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsMenuOpen(true);
		setMenuPosition([e.clientX, e.clientY]);
	};

	return (
		<>
			<div
				onClick={handleClick}
				onContextMenu={handleContextMenu}
				key={note.id}
				aria-label={`link to note ${note.title}`}
				title={`link to note ${note.title}`}
				className={cn(
					'h-9 truncate rounded-xl border-2 border-transparent bg-neutral-100 px-3 text-sm leading-9 transition-colors dark:bg-neutral-800',
					(note.id === noteId || isNoteSelected(note)) &&
						'border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700',
				)}>
				<span className='w-auto max-w-48 shrink-0 truncate text-center text-sm'>
					{note.startTime && note.endTime && (
						<span className='mr-2 font-semibold'>{format(note.startTime, 'yyyy-MM-dd')}</span>
					)}{' '}
					<span className='opacity-75'>{note.title}</span>
					{!note.startTime && !note.endTime && !note.title && (
						<span className='ml-2 opacity-50'>Note without a title</span>
					)}
				</span>{' '}
			</div>
			<NoteMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} note={note} position={menuPosition} />
		</>
	);
};

export default SideNoteItem;
