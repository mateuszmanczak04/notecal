'use client';

import ChangeCourse from '@/app/notes/_components/change-course';
import { Course, Note } from '@prisma/client';
import { useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
	note: Note;
	currentCourse: Course;
	handleClose: () => void;
};

/**
 * Context menu for notes where user can perform various actions.
 */
const NoteContextMenu = ({ note, currentCourse, handleClose }: Props) => {
	const contextMenuRef = useRef<HTMLDivElement>(null!);

	useOnClickOutside(contextMenuRef, handleClose);

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

	return (
		<div ref={contextMenuRef}>
			<ChangeCourse handleClose={handleClose} currentCourse={currentCourse} note={note} forPage='calendar' />
		</div>
	);
};

export default NoteContextMenu;
