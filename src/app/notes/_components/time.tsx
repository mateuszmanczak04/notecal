'use client';

import { Note } from '@prisma/client';
import EndTime from './end-time';
import StartTime from './start-time';

type Props = {
	note: Note;
};

const Time = ({ note }: Props) => {
	return (
		<div className='mt-2 flex items-center gap-2'>
			<StartTime note={note} />
			<EndTime note={note} />
		</div>
	);
};

export default Time;
