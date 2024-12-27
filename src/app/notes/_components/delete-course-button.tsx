'use client';

import deleteCourse from '@/app/courses/_actions/delete-course';
import { Button } from '@/components/button';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
	id: string;
};

/**
 * After first click it shows a confirmation message if user is sure to delete it.
 */
const DeleteCourseButton = ({ id }: Props) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: deleteCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			queryClient.invalidateQueries({ queryKey: ['courses'] });
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const confirmDeletion = () => {
		mutate({ id });
		router.push('/courses');
	};

	if (isDeleting) {
		return (
			<div className='flex flex-col gap-2'>
				<p>Are you sure?</p>
				<Button
					variant='destructive'
					onClick={confirmDeletion}
					className={cn('w-full', isPending && 'pointer-events-none opacity-50')}
					aria-label='yes, delete this note'
					disabled={isPending}>
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
