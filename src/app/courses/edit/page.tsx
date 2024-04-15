import EditCourse from '@/components/edit-course';
import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface EditCoursePageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const EditCoursePage: FC<EditCoursePageProps> = async ({ searchParams }) => {
	const id = searchParams?.id;

	if (!id || typeof id !== 'string') {
		redirect('/courses');
	}

	await dbConnect();

	const course = await Course.findOne({ _id: id });

	return (
		<EditCourse
			course={{ id: course._id, name: course.name, teacher: course.teacher }}
		/>
	);
};

export default EditCoursePage;
