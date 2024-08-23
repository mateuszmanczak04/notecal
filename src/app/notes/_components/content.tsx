'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { useState } from 'react';

const Content = () => {
	const { currentNote, course } = useNoteContext();

	const [content, setContent] = useState(currentNote.content);

	const { mutate: updateContent, isPending } = useMutation({
		mutationFn: async () => updateNote({ id: currentNote.id, content }),
	});

	return (
		<div
			className={cn(
				'mt-4 flex flex-1 flex-col justify-between gap-4 rounded-xl',
				isPending && 'pointer-events-none  opacity-75',
			)}>
			<Textarea
				className='flex-1 resize-none border-2 border-neutral-200 bg-neutral-100 shadow-none focus-visible:border-primary-500 focus-visible:ring-0 dark:border-neutral-600 dark:bg-neutral-700'
				aria-label='note content'
				title='note content'
				value={content}
				onChange={e => setContent(e.target.value)}></Textarea>
			<Button
				onClick={() => updateContent()}
				style={{ background: course?.color }}>
				<Save />
				Save content
			</Button>
		</div>
	);
};

export default Content;
