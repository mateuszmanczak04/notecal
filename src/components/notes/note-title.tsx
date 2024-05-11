'use client';

import { getCourseName } from '@/actions/courses/get-course-name';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

interface NoteTitleProps {
	courseId: string;
	date: Date;
}

const NoteTitle: FC<NoteTitleProps> = ({ courseId, date }) => {
	const { data, isLoading } = useQuery({
		queryFn: async () => await getCourseName({ courseId }),
		queryKey: ['course-name', courseId],
	});

	if (!isLoading) {
		return (
			<div>
				<h1 className='text-xl font-semibold'>
					{data?.courseName} ({date.toDateString()})
				</h1>
			</div>
		);
	}
};

export default NoteTitle;
