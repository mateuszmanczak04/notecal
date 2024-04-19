import EditCourse from '@/components/courses/edit-course';
import { db } from '@/lib/db';
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

	const course = await db.course.findUnique({
		where: {
			id,
		},
	});

	if (!course) {
		redirect('/courses');
	}

	return (
		<EditCourse
			course={{ id: course.id, name: course.name, teacher: course.teacher }}
		/>
	);
};

export default EditCoursePage;
