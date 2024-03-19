import { FC } from 'react';
import RenameCourse from './RenameCourse';
import UpdateTeacher from './UpdateTeacher';
import DeleteCourse from './DeleteCourse';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from './Button';

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
			<Link
				href={`/courses/delete?id=${id}&name=${name}`}
				className={buttonVariants({
					size: 'medium',
					variant: 'secondary',
					className:
						'mt-8 flex w-full flex-1 items-center justify-center gap-1 border-2 border-red-200 bg-red-100 text-red-800 hover:bg-red-200',
				})}>
				Delete Course
			</Link>
		</div>
	);
};

export default EditCourse;
