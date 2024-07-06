'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';

const Title = () => {
	const { course, currentNote } = useNoteContext();

	return (
		<div>
			<h1 className='mt-2 text-xl font-semibold'>
				{course.name}{' '}
				<span className='text-sm opacity-75'>
					({currentNote.startTime.toDateString()})
				</span>
			</h1>
		</div>
	);
};

export default Title;
