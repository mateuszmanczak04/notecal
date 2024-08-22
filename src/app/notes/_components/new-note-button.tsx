'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';
import useSettings from '@/app/settings/_hooks/use-settings';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import useNotes from '../_hooks/use-notes';

const NewNoteButton = () => {
	const { course } = useNoteContext();
	const { settings } = useSettings();
	const { add: addNewNote } = useNotes();

	const onClick = () => {
		if (!settings) return;

		const startTime = new Date();
		const endTime = new Date(
			startTime.getTime() + settings.defaultNoteDuration * 60 * 1000,
		);

		addNewNote({
			id: crypto.randomUUID(),
			courseId: course.id,
			content: 'Empty note',
			startTime,
			endTime,
		});

		// TODO: don't allow user to route to new note until final creation
	};

	return (
		<Button
			style={{ background: course?.color }}
			onClick={onClick}
			className='flex items-center gap-1'>
			<Plus /> Create a new note
		</Button>
	);
};

export default NewNoteButton;
