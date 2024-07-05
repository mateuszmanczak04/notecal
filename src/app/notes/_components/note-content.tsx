'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const NoteContent = () => {
	const { currentNote } = useNoteContext();

	const [content, setContent] = useState(currentNote.content);

	const { mutate: updateContent, isPending } = useMutation({
		mutationFn: async () => updateNote({ id: currentNote.id, content }),
	});

	return (
		<div
			className={cn(
				'mt-2 flex flex-1 flex-col justify-between gap-4 rounded-md bg-primary/5 p-4 dark:bg-white/5',
				isPending && 'pointer-events-none opacity-75',
			)}>
			<Textarea
				className='flex-1 resize-none border-2 border-primary/15 shadow-none dark:border-white/15'
				value={content}
				onChange={e => setContent(e.target.value)}></Textarea>
			<Button onClick={() => updateContent()}>Save</Button>
		</div>
	);
};

export default NoteContent;
