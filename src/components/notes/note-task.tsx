'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface NoteTaskProps {
	title: string;
	description: string;
	priority: number;
	date: string;
}

const NoteTask: FC<NoteTaskProps> = ({
	title,
	description,
	priority,
	date,
}) => {
	return (
		<div className='relative flex flex-col gap-2 rounded-md bg-gray-100 p-4'>
			<p className='text-xl font-semibold'>{title}</p>
			<p>{description}</p>
			<div className='flex items-center gap-2'>
				<div className='h-4 w-4 rounded-full bg-green-500'></div>
				<p className='h-6 min-w-16 rounded-md bg-gray-200 px-1 leading-6'>
					{date}
				</p>
			</div>
			<Button className='mt-2' size='sm'>
				Done
			</Button>
		</div>
	);
};

export default NoteTask;
