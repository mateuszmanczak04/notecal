'use client';

import NoteContextMenu from '@/components/note-context-menu';
import { useNoteContextMenu } from '@/hooks/use-note-context-menu';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
	note: Note;
};

/**
 * Single note link used in /notes/[id] page as side note
 */
const SideNote = ({ note }: Props) => {
	const searchParams = useSearchParams();
	const noteId = searchParams.get('noteId');
	const { closeContextMenu, contextMenuPosition, handleContextMenu } = useNoteContextMenu();

	return (
		<>
			<Link
				href={`/notes?noteId=${note.id}`}
				key={note.id}
				aria-label={`link to note ${note.title}`}
				title={`link to note ${note.title}`}
				onContextMenu={handleContextMenu}
				className={cn(
					'flex h-9 cursor-pointer items-center justify-center gap-2 overflow-x-clip border-b border-l border-r px-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700',
					// First element
					'first-of-type:rounded-t-xl first-of-type:border-t',
					// Last element
					'last-of-type:border-b-transparent',
					note.id === noteId && 'bg-neutral-100 dark:bg-neutral-600',
				)}>
				<span className=' w-full shrink-0 truncate text-center text-sm'>
					{note.startTime && note.endTime && (
						<span className='mr-2 font-semibold'>{format(note.startTime, 'yyyy-MM-dd')}</span>
					)}{' '}
					<span className='opacity-75'>{note.title}</span>
					{!note.startTime && !note.endTime && !note.title && (
						<span className='ml-2 opacity-50'>Note without a title</span>
					)}
				</span>{' '}
			</Link>
			{/* Place it outside the link itself because it triggered */}
			{contextMenuPosition && (
				<NoteContextMenu note={note} handleClose={closeContextMenu} position={contextMenuPosition} />
			)}
		</>
	);
};

export default SideNote;
