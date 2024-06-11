'use client';

import DeleteCourseLink from '@/components/courses/delete-course-link';
import EditCourseForm from '@/components/courses/edit-course-form';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { FC } from 'react';

interface EditCoursePageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const EditCoursePage: FC<EditCoursePageProps> = ({ searchParams }) => {
	const id = searchParams?.id;
	const router = useRouter();

	if (!id || typeof id !== 'string') {
		redirect('/courses');
	}

	return (
		<div className='flex flex-col gap-4'>
			<Button
				variant='secondary'
				onClick={() => router.back()}
				className='flex items-center gap-1'>
				<MoveLeft className='h-5' />
				Go back
			</Button>
			<EditCourseForm id={id} />
			<DeleteCourseLink id={id} />
		</div>
	);
};

export default EditCoursePage;
