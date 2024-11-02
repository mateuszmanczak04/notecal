'use client';

import useSettings from '@/app/settings/_hooks/use-settings';
import { Button } from '@/components/ui/button';
import { Course } from '@prisma/client';
import { Plus } from 'lucide-react';
import { uid } from 'uid';
import useNotes from '../_hooks/use-notes';

type Props = {
	course: Course;
};

const NewNoteButton = ({ course }: Props) => {
	const { settings } = useSettings();
	const { add: addNewNote } = useNotes();

	const onClick = () => {
		if (!settings) return;

		const startTime = new Date();
		const endTime = new Date(
			startTime.getTime() + settings.defaultNoteDuration * 60 * 1000,
		);

		addNewNote({
			id: uid(),
			courseId: course.id,
			content: '',
			startTime,
			endTime,
		});

		// TODO: don't allow user to route to new note until final creation
	};

	return (
		<Button
			style={{ background: course?.color }}
			onClick={onClick}
			className='w-full rounded-t-none'>
			<Plus className='h-4 w-4' /> Create a new note
		</Button>
	);
};

export default NewNoteButton;
