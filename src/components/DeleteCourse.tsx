'use client';

import deleteCourse from '@/actions/deleteCourse';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import { useFormState } from 'react-dom';

interface DeleteCourseProps {
	id: string;
	className: string;
}

const DeleteCourse: FC<DeleteCourseProps> = ({ id, className }) => {
	const [course, dispatch] = useFormState(deleteCourse, undefined);

	return (
		<form action={dispatch} className={className}>
			<input type='hidden' name='id' value={id} />
			<Button variant='destructive' className='w-full gap-1'>
				<Trash2 className='h-4 w-4' />
				Delete Course
			</Button>
		</form>
	);
};

export default DeleteCourse;
