'use client';

import { getCourseTeacher } from '@/actions/courses/get-course-teacher';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

interface NoteTeacherProps {
	courseId: string;
}

const NoteTeacher: FC<NoteTeacherProps> = ({ courseId }) => {
	const { data, isLoading } = useQuery({
		queryFn: async () => await getCourseTeacher({ courseId }),
		queryKey: ['course-teacher', courseId],
	});

	if (!isLoading) {
		return (
			<div className='flex flex-col gap-2'>
				<p className='text-xl font-semibold'>Teacher:</p>
				<div>{data?.teacher}</div>
			</div>
		);
	}
};

export default NoteTeacher;
