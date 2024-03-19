import EditCourse from '@/components/EditCourse';
import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const page: FC<PageProps> = async ({ searchParams }) => {
	const id = searchParams?.id;

	if (!id || typeof id !== 'string') {
		redirect('/courses');
	}

	await dbConnect();

	const course = await Course.findById(id);

	if (!course) {
		redirect('/courses');
	}

	return <EditCourse id={id} name={course.name} teacher={course.teacher} />;
};

export default page;
