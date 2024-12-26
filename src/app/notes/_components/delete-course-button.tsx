'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type Props = {
	id: string;
};

/**
 * After first click it shows a confirmation message if user is sure to delete it.
 */
const DeleteCourseButton = ({ id }: Props) => {
	const { deleteCourse } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const confirmDeletion = () => {
		startTransition(async () => {
			await deleteCourse({ id });
			router.push('/courses');
		});
	};

	if (isDeleting) {
		return (
			<div className='flex flex-col gap-2'>
				<p>Are you sure?</p>
				<Button
					variant='destructive'
					onClick={confirmDeletion}
					className='w-full'
					aria-label='yes, delete this note'>
					{isPending && <LoadingSpinner />}
					Yes
				</Button>
				<Button
					variant='secondary'
					className='w-full'
					onClick={() => setIsDeleting(false)}
					aria-label='no, do not delete this note'>
					No, cancel
				</Button>
			</div>
		);
	}

	return (
		<article>
			<h2 className='text-2xl font-semibold'>Delete Course</h2>
			<p className=''>Delete entire course with all related notes and tasks permanently</p>

			<Button variant='destructive' className='mt-2 w-full' onClick={() => setIsDeleting(true)}>
				<Trash2 className='h-4 w-4' />
				Delete this course
			</Button>
		</article>
	);
};

export default DeleteCourseButton;
