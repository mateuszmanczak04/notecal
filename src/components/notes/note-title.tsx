'use client';

import { FC } from 'react';

interface NoteTitleProps {}

const NoteTitle: FC<NoteTitleProps> = ({}) => {
	return (
		<div>
			<h1 className='text-xl font-semibold'>
				Algorytmy i Struktury Danych (10.02.2024)
			</h1>
		</div>
	);
};

export default NoteTitle;
