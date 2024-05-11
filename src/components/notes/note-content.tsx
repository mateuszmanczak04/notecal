'use client';

import { FC } from 'react';

interface NoteContentProps {
	content: string;
}

const NoteContent: FC<NoteContentProps> = ({ content }) => {
	return (
		<div className='mt-2 flex flex-col gap-4 rounded-md bg-gray-100 p-4'>
			{content}
		</div>
	);
};

export default NoteContent;
