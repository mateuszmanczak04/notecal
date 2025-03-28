import { format } from 'date-fns';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { T_Note } from '../../../../../types';
import { cn } from '../../../../../utils/cn';
import NoteMenu from '../../context-menu/note-menu';
import { useUpdateNoteTitle } from '../../context-menu/use-update-note-title';

type Props = {
	note: T_Note;
};

/**
 * Single note link used in /notes/[id] page as side note
 */
const SideNoteItem = ({ note }: Props) => {
	const [searchParams] = useSearchParams();
	const noteId = searchParams.get('noteId');

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);
	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsMenuOpen(true);
		setMenuPosition([e.clientX, e.clientY]);
	};

	/** Temporary state used to update note title: */
	const [title, setTitle] = useState('');
	const [isRenaming, setIsRenaming] = useState(false);
	const { mutate: mutateUpdateTitle, isPending: isUpdatingTitle } = useUpdateNoteTitle({
		note,
		onSettledCallback: () => setIsRenaming(false),
	});

	const handleStartRename = () => {
		setIsMenuOpen(false);
		setIsRenaming(true);
		setTitle(note.title);
	};

	const handleCancelRename = () => {
		setTitle('');
		setIsRenaming(false);
	};

	const handleSubmitRename = (e: React.FormEvent) => {
		e.preventDefault();
		mutateUpdateTitle({ title });
	};

	return (
		<>
			<Link
				to={`/notes?noteId=${note.id}`}
				onContextMenu={handleContextMenu}
				key={note.id}
				aria-label={`link to note ${note.title}`}
				title={`link to note ${note.title}`}
				className={cn(
					'h-9 select-none truncate rounded-xl border-2 border-transparent bg-neutral-100 px-3 text-sm leading-8 transition-colors dark:bg-neutral-800',
					note.id === noteId &&
						'border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700',
					isUpdatingTitle && 'pointer-events-none opacity-75',
				)}>
				{isRenaming ? (
					<form className='h-full w-full' onSubmit={handleSubmitRename}>
						<input
							onKeyDown={e => {
								if (e.key === 'Escape') handleCancelRename();
							}}
							autoFocus
							placeholder='New title'
							value={title}
							onChange={e => setTitle(e.target.value)}
							onBlur={handleCancelRename}
							className='w-full border-none outline-none'
						/>
					</form>
				) : (
					<span className='w-auto max-w-48 shrink-0 truncate text-center text-sm'>
						{note.startTime && note.endTime && (
							<span className='mr-2 font-semibold'>{format(note.startTime, 'yyyy-MM-dd')}</span>
						)}{' '}
						<span className='opacity-75'>{note.title}</span>
						{!note.startTime && !note.endTime && !note.title && (
							<span className='ml-2 opacity-50'>Note without a title</span>
						)}
					</span>
				)}
			</Link>
			<NoteMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				note={note}
				position={menuPosition}
				onRename={handleStartRename}
			/>
		</>
	);
};

export default SideNoteItem;
