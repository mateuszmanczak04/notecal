import { ChevronRight } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { useCourses } from '../../../../hooks/use-courses';
import { T_Note } from '../../../../types';
import LoadingSpinner from '../../../loading-spinner';
import { useDeleteNote } from './use-delete-note';

type Props = {
	note: T_Note;
	isOpen: boolean;
	onClose: () => void;
	position: [number, number];
};

/**
 * Context menu for notes where user can perform various actions.
 */
const NoteMenu = ({ note, isOpen, onClose, position }: Props) => {
	const menuRef = useRef<HTMLDivElement>(null!);

	const { data: courses } = useCourses();

	useOnClickOutside(menuRef, onClose);

	// Close the menu when user presses the escape key
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	// Position the context menu so it doesn't overflow the window
	useLayoutEffect(() => {
		if (!menuRef.current || !isOpen) return;

		const rect = menuRef.current.getBoundingClientRect();

		if (rect.bottom > window.innerHeight) {
			menuRef.current.style.top = 'auto';
			menuRef.current.style.bottom = '32px';
		}

		if (rect.right > window.innerWidth) {
			menuRef.current.style.left = 'auto';
			menuRef.current.style.right = '32px';
		}
	}, [isOpen]);

	const handleRename = () => {
		console.log('RENAME');
		// TODO:
		// 1. In SideNoteItem show name input instead of current title. Save on pressing Enter, restore previous name on pressing Escape or blurring input.
		// 2. In DaysViewNote note make calendar note block contentEditable and update state similarly to SideNoteItem.
		// 3. In MonthViewNote do similarly.
		// 4. In ListViewNote do similarly.
		onClose();
	};

	const handleDuplicate = () => {
		console.log('DUPLICATE');
		// TODO: make request to duplicate note and update UI
		onClose();
	};

	const handleMoveToCourse = (courseId: string) => {
		console.log('MOVE', courseId);
		// TODO: make request to update note.courseId and update UI
		onClose();
	};

	const { mutate: mutateDelete, isPending: isDeleting } = useDeleteNote({ note });
	const handleDelete = () => {
		console.log('DELETE');
		mutateDelete();
	};

	if (!isOpen) return;

	return createPortal(
		<div
			ref={menuRef}
			className='fixed z-50 flex w-fit cursor-default select-none flex-col rounded-xl bg-white p-2 text-sm shadow-2xl dark:bg-neutral-800'
			style={{
				left: position[0],
				top: position[1],
			}}>
			<button
				onClick={handleRename}
				className='flex items-center rounded-md px-3 py-1 text-start hover:bg-neutral-100 dark:hover:bg-neutral-700'>
				Rename
			</button>
			<button
				onClick={handleDuplicate}
				className='flex items-center rounded-md px-3 py-1 text-start hover:bg-neutral-100 dark:hover:bg-neutral-700'>
				Duplicate
			</button>
			<div className='group relative flex items-center rounded-md px-3 py-1 text-start hover:bg-neutral-100 dark:hover:bg-neutral-700'>
				Move to <ChevronRight className='ml-8 size-4' />
				<div className='absolute left-0 hidden -translate-x-full flex-col rounded-xl bg-white p-2 shadow-2xl group-hover:flex dark:bg-neutral-800'>
					{courses?.map(course => (
						<button
							key={course.id}
							onClick={() => handleMoveToCourse(course.id)}
							className='flex items-center gap-2 text-nowrap rounded-md px-3 py-1 text-start hover:bg-neutral-100 dark:hover:bg-neutral-700'>
							{course.name}{' '}
							{course.id === note.courseId && (
								<div className='size-1.5 shrink-0 rounded-full bg-neutral-800 dark:bg-white' />
							)}
						</button>
					))}
					{courses?.length === 0 && <p>No courses available</p>}
				</div>
			</div>
			<button
				onClick={handleDelete}
				className='bg-error-50 text-error-800 dark:text-error-100 hover:bg-error-100 dark:bg-error-800 dark:hover:bg-error-700 flex items-center gap-2 rounded-md px-3 py-1 text-start'>
				Delete {isDeleting && <LoadingSpinner className='size-4' />}
			</button>

			{/* {selectedNotes.length <= 1 && currentCourse && (
			// TODO: single note actions
				<div>
					<NoteTitle note={note} callback={closeMenu} />
					<p className='mb-1 mt-4 px-2 font-semibold'>Move to another course</p>
					<ChangeNoteCourse handleClose={closeMenu} currentCourse={currentCourse} note={note} />
					<DuplicateNote note={note} className='mt-4 w-full' callback={closeMenu} />
					<DeleteNoteButton note={note} className='mt-4 w-full' />
				</div>
			)} */}
			{/* {selectedNotes.length > 1 && (
			TODO: multiple notes actions
				<DeleteManyNotesButton onDelete={deselectAll} notes={selectedNotes} className='mt-4 w-full' />
			)} */}
		</div>,
		document.body,
	);
};

export default NoteMenu;
