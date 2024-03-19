'use client';

import { FC } from 'react';
import SubmitButton from './SubmitButton';
import deleteCourse from '@/actions/deleteCourse';
import { useFormState } from 'react-dom';
import { Trash2 } from 'lucide-react';

interface DeleteCourseProps {
	id: string;
	className: string;
}

const DeleteCourse: FC<DeleteCourseProps> = ({ id, className }) => {
	const [course, dispatch] = useFormState(deleteCourse, undefined);

	return (
		<form action={dispatch} className={className}>
			<input type='hidden' name='id' value={id} />
			<SubmitButton
				size='medium'
				className='flex w-full flex-1 items-center justify-center gap-1 border-2 border-red-200 bg-red-100 text-red-800 hover:bg-red-200'
				variant='secondary'>
				<Trash2 className='h-4 w-4' />
				Delete Course
			</SubmitButton>
		</form>
	);
};

export default DeleteCourse;
