'use client';

import createNote from '@/app/notes/_actions/create-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import queryClient from '@/lib/query-client';
import { cn } from '@/lib/utils';
import { Note } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTransition } from 'react';

const NewNoteButton = () => {
	const { course } = useNoteContext();
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(async () => {
			const { newNote } = await createNote({
				courseId: course.id!,
				startTime: new Date(),
				content: 'Empty note',
			});

			queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
				return {
					notes: [...prev.notes, newNote],
				};
			});
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
