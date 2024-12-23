'use client';

import { Button } from '@/components/button';
import GoBackButton from '@/components/go-back-button';
import { Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const DeleteCoursePage = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	const router = useRouter();

	const removeCourse = (values: any) => {};

	if (!id) {
		router.push('/courses');
		return;
	}

	const handleDelete = () => {
		removeCourse(id);
	};

	return (
		<div className='mx-auto max-w-[600px]'>
			<h1 className='text-2xl font-semibold'>Delete Course</h1>
			<p className='mt-2'>Are you sure you want to delete this course with all it&apos;s tasks and notes?</p>

			<div className='grid gap-x-4 gap-y-2 pt-4 sm:grid-cols-2'>
				<GoBackButton variant='secondary'>Cancel</GoBackButton>
				<Button onClick={handleDelete} variant='destructive' className='w-full'>
					<Trash2 className='h-4 w-4' />
					Delete Permanently
				</Button>
			</div>
		</div>
	);
};

export default DeleteCoursePage;
