'use client';

import { FC } from 'react';

interface NoteTeacherProps {}

const NoteTeacher: FC<NoteTeacherProps> = ({}) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<div>Profesor Andrew Huberman</div>
		</div>
	);
};

export default NoteTeacher;
