'use client';

import { useSelectedNotes } from '@/app/notes/_components/sidebar/side-notes/selected-notes-context';
import { useNoteContextMenu } from '@/hooks/use-note-context-menu';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import NoteContextMenu from '../../context-menu/note-context-menu';

type Props = {
	note: Note;
};

/**
 * Single note link used in /notes/[id] page as side note
 */
const SideNoteItem = ({ note }: Props) => {
	const searchParams = useSearchParams();
	const noteId = searchParams.get('noteId');
	const { closeContextMenu, contextMenuPosition, handleContextMenu } = useNoteContextMenu();
	const { deselectAll, deselectNote, selectNote, isNoteSelected } = useSelectedNotes();

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
		}
	};

	const handleNoteContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		if (noteId !== note.id && !isNoteSelected(note)) return;
		handleContextMenu(e);
	};

	return (
		<>
			<Link
				onClick={handleClick}
				href={`/notes?noteId=${note.id}`}
				key={note.id}
				aria-label={`link to note ${note.title}`}
				title={`link to note ${note.title}`}
				onContextMenu={handleNoteContextMenu}
				className={cn(
					'h-9 truncate rounded-xl border-2 border-transparent bg-neutral-100 px-3 text-sm leading-9 transition-colors dark:bg-neutral-800',
					(note.id === noteId || isNoteSelected(note)) && 'border-neutral-300  dark:border-neutral-600 ',
				)}>
				<span className=' w-auto max-w-48 shrink-0 truncate text-center text-sm'>
					{note.startTime && note.endTime && (
						<span className='mr-2 font-semibold'>{format(note.startTime, 'yyyy-MM-dd')}</span>
					)}{' '}
					<span className='opacity-75'>{note.title}</span>
					{!note.startTime && !note.endTime && !note.title && (
						<span className='ml-2 opacity-50'>Note without a title</span>
					)}
				</span>{' '}
			</Link>

			{/* Place it outside the link itself because it triggered link */}
			{contextMenuPosition && (
				<NoteContextMenu note={note} handleClose={closeContextMenu} position={contextMenuPosition} />
			)}
		</>
	);
};

export default SideNoteItem;
