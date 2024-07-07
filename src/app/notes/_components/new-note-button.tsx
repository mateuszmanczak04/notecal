'use client';

import createNote from '@/app/notes/_actions/create-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import LocalNotes from '@/lib/local-notes';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useTransition } from 'react';

const NewNoteButton = () => {
	const { course } = useNoteContext();
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(async () => {
			// TODO: optimistic updates
			const { newNote } = await createNote({
				courseId: course.id!,
				startTime: new Date(),
				content: 'Empty note',
			});
			if (!newNote) return;
			await LocalNotes.append(newNote);
		});
	};

	return (
		<Button
			onClick={onClick}
			size='sm'
			className={cn(
				'flex items-center gap-1',
				isPending && 'pointer-events-none opacity-75 transition',
			)}>
			<Plus className='h-4 w-4' /> Create New Note
		</Button>
	);
};

export default NewNoteButton;
