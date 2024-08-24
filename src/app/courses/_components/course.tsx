import useNotes from '@/app/notes/_hooks/use-notes';
import useSettings from '@/app/settings/_hooks/use-settings';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface CourseProps {
	name: string;
	id: string;
	teacher: string;
	color: string;
}

const Course: FC<CourseProps> = ({ name, teacher, id, color }) => {
	const { notes, isPending } = useNotes();
	const filteredNotes = notes?.filter(note => note.courseId === id);
	const { settings } = useSettings();
	const { add: addNewNote } = useNotes();
	const router = useRouter();

	const handleClick = () => {
		if (!settings || !notes) return;

		const courseNotes = notes.filter(n => n.courseId === id);

		if (courseNotes.length > 0) {
			router.push(`/notes/${id}/${courseNotes.at(-1)?.id}`);
		} else {
			// Create first course note
			const startTime = new Date();
			const endTime = new Date(
				startTime.getTime() + settings.defaultNoteDuration * 60 * 1000,
			);
			const newNoteId = crypto.randomUUID();
			addNewNote({
				id: newNoteId,
				courseId: id,
				content: 'Empty note',
				startTime,
				endTime,
			});
			router.push(`/notes/${id}/${newNoteId}`);
		}
	};

	return (
		<div
			className='cursor-pointer rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: color }}
			onClick={handleClick}>
			<p className='line-clamp-1 rounded-xl text-xl font-medium'>
				{name}
			</p>
			<p className='mt-1 line-clamp-1 opacity-75'>{teacher}</p>
		</div>
	);
};

export default Course;
