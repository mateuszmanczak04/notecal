'use client';

import updateNote from '@/actions/notes/update-note';
import { useNoteContext } from '@/components/notes/note-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const NoteContent = () => {
	const {
		currentNote,
		// blocksIsLoading: isLoading,
		// blocks,
		// blocksError: error,
	} = useNoteContext();

	// if (error) {
	// 	return <p className='rounded-md bg-red-100 p-2 text-red-800'>{error}</p>;
	// }

	// if (isLoading) {
	// 	return <p className='animate-bounce'>Loading...</p>;
	// }

	const [content, setContent] = useState(currentNote.content);

	const { mutate: updateContent, isPending } = useMutation({
		mutationFn: async () => updateNote({ id: currentNote.id, content }),
	});

	return (
		<div
			className={cn(
				'mt-2 flex flex-1 flex-col justify-between gap-4 rounded-md bg-gray-100 p-4',
				isPending && 'pointer-events-none opacity-75',
			)}>
			<Textarea
				className='flex-1 resize-none shadow-none'
				value={content}
				onChange={e => setContent(e.target.value)}></Textarea>
			<Button onClick={() => updateContent()}>Save</Button>
		</div>
	);
};

export default NoteContent;
