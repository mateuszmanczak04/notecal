'use client';

import { Button } from '@/components/button';
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
			<Button asChild variant='secondary'>
				<Link
					href={`/notes?noteId=${note.id}`}
					key={note.id}
					aria-label={`link to note ${note.title}`}
					title={`link to note ${note.title}`}
					onContextMenu={handleContextMenu}
					className={cn(note.id === noteId && 'border-2 border-neutral-200 dark:border-neutral-600')}>
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
			</Button>
			{/* Place it outside the link itself because it triggered link */}
			{contextMenuPosition && (
				<NoteContextMenu note={note} handleClose={closeContextMenu} position={contextMenuPosition} />
			)}
		</>
	);
};

export default SideNote;
