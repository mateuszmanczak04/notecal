'use client';

import createNote from '@/app/notes/_actions/create-note';
import LoadingSpinner from '@/components/loading-spinner';
import { useNotes } from '@/hooks/use-notes';
import { Course as T_Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

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
			There was an error when loading a course, try refreshing page
		</div>
	);
};

/**
 * A link navigating to the latest note from it's course.
 */
const Course = ({ course }: Props) => {
	const { data: notes } = useNotes();
	const thisCourseNotes = notes?.filter(note => note.courseId === course.id);

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: createNote,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			queryClient.refetchQueries({ queryKey: ['notes'] });
		},
	});

	useEffect(() => {
		if (thisCourseNotes?.length === 0) {
			mutate({ courseId: course.id });
		}
	}, []);

	if (isPending) return <CourseLoadingFallback />;

	// Should not occur as we are not allowing to leave a course without any note
	if (!thisCourseNotes || thisCourseNotes.length === 0) {
		return <CourseErrorFallback />;
	}

	return (
		<Link
			href={`/notes/${thisCourseNotes[0]?.id}`}
			className='flex cursor-pointer items-center justify-between rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: course.color }}>
			<div className='flex-1 overflow-x-hidden '>
				<p className='truncate rounded-xl text-xl font-medium'>{course.name}</p>
				<p className='mt-1 truncate opacity-75'>{course.teacher}</p>
			</div>
			<ChevronRight className='h-10 w-10' />
		</Link>
	);
};

export default Course;
