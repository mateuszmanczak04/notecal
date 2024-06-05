'use client';

import createNote from '@/actions/notes/create-note';
import { useNoteContext } from '@/components/notes/note-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTransition } from 'react';

const NewNoteButton = () => {
	const { course } = useNoteContext();
	const [isPending, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const onClick = () => {
		startTransition(async () => {
			await createNote({
				courseId: course.id!,
				startTime: new Date(),
				content: 'Empty note',
			});
			// add it do the local state instead of invalidating
			queryClient.invalidateQueries({
				queryKey: ['notes'],
			});
		});
	};

	return (
		<Button
			onClick={onClick}
			size='sm'
			variant='ghost'
			className={cn(
				'flex items-center gap-1',
				isPending && 'pointer-events-none opacity-75 transition',
			)}>
			<Plus className='h-4 w-4' /> Create New Note
		</Button>
	);
};

export default NewNoteButton;
