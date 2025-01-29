'use client';

import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import updateNote from '../_actions/update-note';

type Props = {
	note: Note;
};

const NoteTitle = ({ note }: Props) => {
	const queryClient = useQueryClient();
	const titleRef = useRef<HTMLHeadingElement>(null!);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateNote,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleSubmit = () => {
		const newTitle = titleRef.current.innerText;
		// Don't want to update the same value:
		if (newTitle.trim() === note.title) return;
		mutate({ id: note.id, title: newTitle.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!titleRef.current) return;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			titleRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			titleRef.current.innerText = note.title;
			titleRef.current.blur();
			return;
		}
	};

	// Set initial value:
	useEffect(() => {
		if (!titleRef.current) return;
		titleRef.current.innerText = note.title;
	}, [note.title]);

	return (
		<h2
			ref={titleRef}
			contentEditable
			className={cn(
				'mb-2 break-all rounded-md bg-white px-3 py-2 text-center text-2xl font-semibold outline-none transition-opacity dark:bg-neutral-800',
				isPending && 'pointer-events-none opacity-50',
				// Styling for placeholder:
				'relative after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:hidden after:-translate-x-1/2 after:-translate-y-1/2 after:font-medium after:opacity-50 after:content-["Note_title"]',
				note.title.length === 0 && !isPending && 'after:block focus:after:hidden',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></h2>
	);
};

export default NoteTitle;
