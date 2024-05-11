'use client';

import { FC } from 'react';

interface NoteTitleProps {
	title: string;
}

const NoteTitle: FC<NoteTitleProps> = ({ title }) => {
	return (
		<div>
			<h1 className='text-xl font-semibold'>
				{title}
			</h1>
		</div>
	);
};

export default NoteTitle;
