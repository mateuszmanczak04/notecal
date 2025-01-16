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
		<div
			ref={contextMenuRef}
			className='absolute left-0 top-0 z-30 w-72 rounded-xl bg-white p-4 shadow-xl dark:bg-neutral-700'>
			<ChangeCourse handleClose={handleClose} currentCourse={currentCourse} note={note} forPage='context-menu' />
		</div>
	);
};

export default NoteContextMenu;
