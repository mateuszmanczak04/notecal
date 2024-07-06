'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';

const Teacher = () => {
	const { course } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<div>{course.teacher}</div>
		</div>
	);
};

export default Teacher;
