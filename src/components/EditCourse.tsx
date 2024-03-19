import { FC } from 'react';
import RenameCourse from './RenameCourse';
import UpdateTeacher from './UpdateTeacher';
import DeleteCourse from './DeleteCourse';
import { redirect } from 'next/navigation';

interface EditCourseProps {
	id: string;
	name: string;
	teacher?: string;
}

const EditCourse: FC<EditCourseProps> = ({ id, name, teacher }) => {
	if (!id || !name) {
		redirect('/courses');
	}

	return (
		<div className='w-full'>
			<h1 className='text-2xl font-semibold'>Edit Course</h1>
			<RenameCourse id={id} name={name} />
			<UpdateTeacher id={id} teacher={teacher} />
			<DeleteCourse id={id} />
		</div>
	);
};

export default EditCourse;
