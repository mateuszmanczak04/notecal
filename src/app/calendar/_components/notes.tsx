'use client';

import { MouseEvent } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import Note from './note';

const Notes = () => {
	const { notes } = useCalendarContext();

	const handleClick = (event: MouseEvent) => {
		console.log('TODO: get mouse position and create a new note');
	};

	return (
		// TODO: hard coded sizes and position - should be based
		// on tailwind variables describin grid sizes
		<div
			className='absolute left-20 top-10 h-[calc(100%-40px)] w-[calc(100%-80px)] overflow-hidden'
			onClick={handleClick}>
			{notes.map(note => (
				<Note key={note.id} note={note} />
			))}
		</div>
	);
};

export default Notes;
