'use client';

import deleteCourse from '@/app/courses/_actions/delete-course';
import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
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
const NoteDangerZone = ({ id }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: deleteCourse,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			queryClient.invalidateQueries({ queryKey: ['courses'] });
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const confirmDeletion = () => {
		mutate({ id });
		router.replace('/courses');
	};

	return (
		<fieldset className='space-y-4 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
			<legend className='px-2'>Danger zone</legend>
			{isDeleting ? (
				<div>
					<p>Are you sure?</p>
					<Button
						variant='destructive'
						onClick={confirmDeletion}
						className={cn('mt-4 w-full', isPending && 'pointer-events-none opacity-50')}
						aria-label='Yes, delete entire course'
						disabled={isPending}>
						Yes {isPending && <LoadingSpinner className='size-4' />}
					</Button>
					<Button
						variant='secondary'
						className='mt-4 w-full'
						onClick={() => setIsDeleting(false)}
						aria-label='No, do not delete entire course'>
						No, cancel
					</Button>
				</div>
			) : (
				<article>
					<h2 className='text-2xl font-semibold'>Delete Course</h2>
					<p className='mt-2'>Delete entire course with all related notes and tasks permanently</p>

					<Button variant='destructive' className='mt-4 w-full' onClick={() => setIsDeleting(true)}>
						<Trash2 className='h-4 w-4' />
						Delete this course
					</Button>
				</article>
			)}
		</fieldset>
	);
};

export default NoteDangerZone;
