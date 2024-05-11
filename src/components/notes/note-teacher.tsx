'use client';

import { FC } from 'react';

interface NoteTeacherProps {
	teacher: string;
}

const NoteTeacher: FC<NoteTeacherProps> = ({ teacher }) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<div>{teacher}</div>
		</div>
	);
};

export default NoteTeacher;
