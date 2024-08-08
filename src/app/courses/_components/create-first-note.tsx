'use client';

import useNotes from '@/app/notes/_hooks/use-notes';
import useSettings from '@/app/settings/_hooks/use-settings';
import { FC } from 'react';

interface CreateFirstNoteProps {
	courseId: string;
}

const CreateFirstNote: FC<CreateFirstNoteProps> = ({ courseId }) => {
	// const router = useRouter();
	const { settings } = useSettings();
	const { add: addNewNote } = useNotes();

	const handleClick = () => {
		if (!settings) return;

		const startTime = new Date();
		const endTime = new Date(
			startTime.getTime() + settings.defaultNoteDuration * 60 * 1000,
		);
		addNewNote({ courseId, content: 'Empty note', startTime, endTime });

		// TODO: fake this id and somehow replace it when note is created:
		// router.push(`/notes/${courseId}/${newNote.id}`);
	};

	return (
		<button
			onClick={handleClick}
			className='flex h-6 shrink-0 items-center justify-center text-nowrap rounded-md bg-gray-100 px-4 transition hover:bg-gray-200'>
			Create the first note
		</button>
	);
};

export default CreateFirstNote;
