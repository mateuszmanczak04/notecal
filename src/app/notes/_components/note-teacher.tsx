'use client';

import { useNoteContext } from '@/app/notes/_components/note-context';

const NoteTeacher = () => {
	const { course } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<div>{course.teacher}</div>
		</div>
	);
};

export default NoteTeacher;
