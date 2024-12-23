'use client';

import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { Plus } from 'lucide-react';
import { useTransition } from 'react';
import createNote from '../_actions/create-note';

type Props = {
	courseId: string;
	color: string;
};

const NewNoteButton = ({ courseId, color }: Props) => {
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(async () => {
			await createNote({ courseId });
		});
	};

	return (
		<Button style={{ backgroundColor: color }} onClick={onClick} className='w-full rounded-t-none'>
			{isPending && <LoadingSpinner />}
			<Plus className='h-4 w-4' /> Create a new note
		</Button>
	);
};

export default NewNoteButton;
