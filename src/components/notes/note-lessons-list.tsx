'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface NoteLessonsListProps {}

const NoteLessonsList: FC<NoteLessonsListProps> = ({}) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Lessons:</p>
			<Button variant='secondary' size='sm'>
				Mon 03.03.2024
			</Button>
			<Button variant='secondary' size='sm'>
				Mon 10.03.2024
			</Button>
			<Button variant='secondary' size='sm'>
				Mon 17.03.2024
			</Button>
			<Button variant='default' size='sm'>
				Mon 24.03.2024
			</Button>
			<Button variant='secondary' size='sm'>
				Tue 25.03.2024
			</Button>
		</div>
	);
};

export default NoteLessonsList;
