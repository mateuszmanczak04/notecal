'use client';

import { createNewNote } from '@/actions/create-new-note';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useTransition } from 'react';

interface NewNoteButtonProps {
	courseId: string;
}

const NewNoteButton: FC<NewNoteButtonProps> = ({ courseId }) => {
	const [isPending, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const onClick = () => {
		if (courseId && typeof courseId === 'string') {
			startTransition(async () => {
				await createNewNote({ courseId });
				queryClient.invalidateQueries({ queryKey: ['notes', courseId] });
			});
		}
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
