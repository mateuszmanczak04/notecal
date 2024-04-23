import DeleteCourseLink from '@/components/courses/delete-course-link';
import EditCourseForm from '@/components/courses/edit-course-form';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface EditCoursePageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const EditCoursePage: FC<EditCoursePageProps> = ({ searchParams }) => {
	const id = searchParams?.id;

	if (!id || typeof id !== 'string') {
		redirect('/courses');
	}

	return (
		<>
			<EditCourseForm id={id} />
			<Separator className='my-8' />
			<DeleteCourseLink id={id} />
		</>
	);
};

export default EditCoursePage;
