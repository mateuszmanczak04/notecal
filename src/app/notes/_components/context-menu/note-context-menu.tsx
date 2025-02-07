'use client';

import NoteTitle from '@/app/notes/_components/context-menu/note-title';
import { useSelectedNotes } from '@/app/notes/_context/selected-notes-context';
import { useCourses } from '@/hooks/use-courses';
import { Note } from '@prisma/client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import ChangeNoteCourse from './change-note-course';
import DeleteManyNotesButton from './delete-many-notes-button';
import DeleteNoteButton from './delete-note-button';
import DuplicateNote from './duplicate-note';

type Props = {
	note: Note;
	handleClose: () => void;
	position: { x: number; y: number } | null;
};

/**
 * Context menu for notes where user can perform various actions.
 */
const NoteContextMenu = ({ note, handleClose, position }: Props) => {
	const { data: courses } = useCourses();
	const currentCourse = courses?.find(c => c.id === note.courseId);
	const contextMenuRef = useRef<HTMLDivElement>(null!);
	const { selectedNotes, deselectAll } = useSelectedNotes();

	useOnClickOutside(contextMenuRef, () => {
		handleClose();
	});

	// Close the context menu when user presses the escape key
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [handleClose]);

	// Position the context menu so it doesn't overflow the window
	useLayoutEffect(() => {
		if (!contextMenuRef.current) return;

		const rect = contextMenuRef.current.getBoundingClientRect();

		if (rect.bottom > window.innerHeight) {
			contextMenuRef.current.style.top = 'auto';
			contextMenuRef.current.style.bottom = '32px';
		}

		if (rect.right > window.innerWidth) {
			contextMenuRef.current.style.left = 'auto';
			contextMenuRef.current.style.right = '32px';
		}
	}, []);

	if (position === null) return;

	return (
		<div
			ref={contextMenuRef}
			className='fixed z-50 w-[clamp(12rem,90vw,24rem)] cursor-default select-none rounded-xl bg-white p-4 shadow-2xl dark:bg-neutral-700'
			style={{
				left: position.x,
				top: position.y,
			}}>
			{selectedNotes.length <= 1 && currentCourse && (
				<div>
					<NoteTitle note={note} callback={handleClose} />
					<p className='mb-1 mt-4 px-2 font-semibold'>Move to another course</p>
					<ChangeNoteCourse handleClose={handleClose} currentCourse={currentCourse} note={note} />
					<DuplicateNote note={note} className='mt-4 w-full' callback={handleClose} />
					<DeleteNoteButton note={note} className='mt-4 w-full' />
				</div>
			)}
			{selectedNotes.length > 1 && (
				<DeleteManyNotesButton onDelete={deselectAll} notes={selectedNotes} className='mt-4 w-full' />
			)}
		</div>
	);
};

export default NoteContextMenu;
