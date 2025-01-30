'use client';

import ChangeCourse from '@/app/notes/_components/change-course';
import DeleteNoteButton from '@/app/notes/_components/delete-note-button';
import { useCourses } from '@/hooks/use-courses';
import { Note } from '@prisma/client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

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
			contextMenuRef.current.style.bottom = '0';
		}

		if (rect.right > window.innerWidth) {
			contextMenuRef.current.style.left = 'auto';
			contextMenuRef.current.style.right = '0';
		}
	}, []);

	if (position === null) return;

	return (
		<div
			ref={contextMenuRef}
			className='fixed z-50 w-72 rounded-xl bg-white p-4 pb-20 shadow-xl dark:bg-neutral-700'
			style={{
				left: position.x,
				top: position.y,
			}}>
			{currentCourse && (
				<div>
					<p className='mb-2 px-2 font-semibold'>Move to another course</p>
					<ChangeCourse
						handleClose={handleClose}
						currentCourse={currentCourse}
						note={note}
						forPage='context-menu'
					/>
					<DeleteNoteButton note={note} className='mt-4 w-full' />
				</div>
			)}
		</div>
	);
};

export default NoteContextMenu;
