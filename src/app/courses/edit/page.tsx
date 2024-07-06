'use client';

import EditCourseForm from '@/app/courses/_components/edit-course-form';
import { Button } from '@/components/ui/button';
import { MoveLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
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
		<div className='mx-auto flex max-w-[600px] flex-col gap-4'>
			<Button
				variant='secondary'
				onClick={() => router.back()}
				className='flex items-center gap-1'>
				<MoveLeft className='h-5' />
				Go back
			</Button>
			<EditCourseForm id={id} />
			<Link
				href={`/courses/delete?id=${id}`}
				className='flex h-10 shrink-0 items-center justify-center gap-1 rounded-md bg-red-50 px-4 text-red-500 transition hover:bg-red-100'>
				<Trash2 className='h-4 w-4' />
				Delete
			</Link>
		</div>
	);
};

export default EditCoursePage;
