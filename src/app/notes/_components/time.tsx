'use client';

import { Note } from '@prisma/client';
import EndTime from './end-time';
import StartTime from './start-time';

type Props = {
	note: Note;
};

const Time = ({ note }: Props) => {
	return (
		<>
			<StartTime note={note} />
			<EndTime note={note} />
		</>
	);
};

export default Time;
