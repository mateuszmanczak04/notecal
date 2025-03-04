'use client';

import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useNoteContext } from '../../_content/note-context';

/** Component to delete entire course */
const NoteDangerZone = () => {
	const { currentCourse } = useNoteContext();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string }) =>
			await fetch(`/api/courses/${data.id}`, {
				method: 'DELETE',
			}).then(res => res.json()),
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
		if (!currentCourse) return;
		mutate({ id: currentCourse.id });
		router.replace('/courses');
	};

	return (
		<div className='space-y-4 border-b border-neutral-200 p-6 dark:border-neutral-700'>
			{isDeleting ? (
				<div>
					<p className='font-semibold'>Are you 100% sure to delete this course?</p>
					<p className='mt-2 text-sm opacity-75'>You cannot undo it later</p>
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
						className='mt-2 w-full'
						onClick={() => setIsDeleting(false)}
						aria-label='No, do not delete entire course'>
						No, cancel
					</Button>
				</div>
			) : (
				<article>
					<h2 className='font-semibold'>Delete Course</h2>
					<p className='mt-2 text-sm opacity-75'>
						Delete entire course with all related notes and tasks permanently
					</p>

					<Button variant='destructive' className='mt-4 w-full' onClick={() => setIsDeleting(true)}>
						<Trash2 className='h-4 w-4' />
						Delete this course
					</Button>
				</article>
			)}
		</div>
	);
};

export default NoteDangerZone;
