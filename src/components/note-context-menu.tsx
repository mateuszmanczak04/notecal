'use client';

import { useCalendarContext } from '@/app/calendar/_context/calendar-context';
import ChangeCourse from '@/app/notes/_components/change-course';
import { Course, Note } from '@prisma/client';
import { useEffect, useLayoutEffect, useRef } from 'react';
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
	const { containerRef } = useCalendarContext();

	useOnClickOutside(contextMenuRef, handleClose);

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

	// Position the context menu so it doesn't overflow the container
	useLayoutEffect(() => {
		if (!containerRef.current || !contextMenuRef.current) return;

		const rect = contextMenuRef.current.getBoundingClientRect();
		const containerRect = containerRef.current.getBoundingClientRect();

		if (rect.bottom > containerRect.bottom) {
			contextMenuRef.current.style.top = 'auto';
			contextMenuRef.current.style.bottom = '0';
		}

		if (rect.right > containerRect.right) {
			contextMenuRef.current.style.left = 'auto';
			contextMenuRef.current.style.right = '0';
		}
	}, [containerRef]);

	return (
		<div
			ref={contextMenuRef}
			className='absolute left-0 top-0 z-30 w-72 rounded-xl bg-white p-4 shadow-xl dark:bg-neutral-700'>
			<ChangeCourse handleClose={handleClose} currentCourse={currentCourse} note={note} forPage='context-menu' />
		</div>
	);
};

export default NoteContextMenu;
