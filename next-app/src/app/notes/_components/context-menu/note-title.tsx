'use client';

import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
	note: Note;
	callback?: () => void;
};

const NoteTitle = ({ note, callback }: Props) => {
	const queryClient = useQueryClient();
	const [title, setTitle] = useState(note.title);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string; title: string }) =>
			await fetch(`/api/notes/${data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: data.title }),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() === note.title) return;
		mutate({ id: note.id, title: title.trim() });
		callback?.();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn('transition-opacity', isPending && 'pointer-events-none opacity-50')}>
			<label htmlFor='note-title' className='mb-1 block px-2 font-semibold'>
				Title
			</label>
			<Input
				value={title}
				onChange={e => setTitle(e.target.value)}
				id='note-title'
				name='note-title'
				type='text'
				placeholder='Enter a title'
				onBlur={handleSubmit}
			/>
		</form>
	);
};

export default NoteTitle;
