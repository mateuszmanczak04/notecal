'use client';

import { useNotes } from '@/app/_hooks/use-notes';
import createNote from '@/app/notes/_actions/create-note';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { Course as T_Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

type Props = {
	course: T_Course;
};

/**
 * A grid tile with loading spinner.
 */
const CourseLoadingFallback = () => {
	return (
		<div className='pointer-events-none grid place-content-center rounded-xl bg-neutral-50 p-4 dark:bg-neutral-700 dark:text-white'>
			<LoadingSpinner />
		</div>
	);
};

const CourseErrorFallback = () => {
	return (
		<div className='pointer-events-none grid place-content-center rounded-xl bg-error-50 p-4 dark:bg-error-700 dark:text-white'>
			There was an error when loading a course
		</div>
	);
};

/**
 * A link navigating to the latest note from it's course. If there are not notes it will automatically create one before rendering.
 */
const Course = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const { data: notes } = useNotes();
	const { toast } = useToast();
	const { error, isPending, mutate } = useMutation({
		mutationFn: createNote,
		onMutate: () => {
			// TODO: optimistic update
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const thisCourseNotes = notes?.filter(note => note.courseId === course.id) || [];
	const hasCreatedNote = useRef(false);

	// Create a first note if it doesn't exist yet
	useEffect(() => {
		if (thisCourseNotes.length === 0 && !hasCreatedNote.current) {
			hasCreatedNote.current = true;
			mutate({ courseId: course.id });
		}
	}, [course.id, thisCourseNotes.length, mutate]);

	if (error) return <CourseErrorFallback />;

	if (isPending) return <CourseLoadingFallback />;

	return (
		<Link
			href={`/notes/${thisCourseNotes[0]?.id}`}
			className='flex cursor-pointer items-center justify-between rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: course.color }}>
			<div>
				<p className='line-clamp-1 rounded-xl text-xl font-medium'>{course.name}</p>
				<p className='mt-1 line-clamp-1 opacity-75'>{course.teacher}</p>
			</div>
			<ChevronRight className='h-10 w-10 shrink-0' />
		</Link>
	);
};

export default Course;
