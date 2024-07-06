'use client';

import createNote from '@/app/notes/_actions/create-note';
import queryClient from '@/lib/query-client';
import { cn } from '@/lib/utils';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useTransition } from 'react';

interface CreateFirstNoteProps {
	courseId: string;
}

const CreateFirstNote: FC<CreateFirstNoteProps> = ({ courseId }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const { newNote } = await createNote({
				courseId,
				content: 'Empty note',
				startTime: new Date(),
			});
			if (!newNote) return;
			queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
				return { notes: [...prev.notes, newNote] };
			});
			router.push(`/notes/${courseId}/${newNote.id}`);
		});
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				'flex h-6 shrink-0 items-center justify-center rounded-md bg-gray-100 px-4 transition hover:bg-gray-200',
				isPending && 'opacity-50',
			)}>
			Create the first note
		</button>
	);
};

export default CreateFirstNote;
