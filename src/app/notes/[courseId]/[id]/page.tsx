'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import Content from '@/app/notes/_components/content';
import DeleteButton from '@/app/notes/_components/delete-button';
import Tasks from '@/app/notes/_components/tasks';
import Teacher from '@/app/notes/_components/teacher';
import Time from '@/app/notes/_components/time';
import Title from '@/app/notes/_components/title';
import useTasks from '@/app/tasks/_hooks/use-tasks';
import GoBackButton from '@/components/common/go-back-button';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideNotes from '../../_components/side-notes';
import useNotes from '../../_hooks/use-notes';

const NotePage = () => {
	const { notes, isPending: isNotesPending, error: notesError } = useNotes();
	const { tasks, isPending: isTasksPending, error: tasksError } = useTasks();
	const { isPending: isCoursesPending } = useCourses();
	const { courseId, id } = useParams();
	const router = useRouter();

	// Filter only notes and tasks relevant to this course
	const currentCourse = useCourse(courseId as string);
	const thisCourseNotes = notes?.filter(note => note.courseId === courseId);
	const currentNote = thisCourseNotes?.filter(note => note.id === id)[0];
	const thisCourseTasks = tasks?.filter(task => task.courseId === courseId);

	useEffect(() => {
		if (isNotesPending || isTasksPending || isCoursesPending) return;

		if (!currentNote || !currentCourse) {
			router.push('/courses');
			return;
		}
	}, [
		currentCourse,
		currentNote,
		router,
		isNotesPending,
		isTasksPending,
		isCoursesPending,
	]);

	// TODO: show loading skeletons instead of this
	if (isCoursesPending || !currentCourse || !currentNote)
		return <LoadingSpinner />;

	return (
		<div className='mx-auto flex h-full min-h-80 max-w-[1200px] gap-4'>
			<div className='flex h-full flex-1 flex-col'>
				<div className='flex gap-2'>
					<GoBackButton variant='secondary' className='w-fit'>
						<ArrowLeft className='h-4 w-4' />
						Go back
					</GoBackButton>
					<Button asChild variant='secondary'>
						<Link
							prefetch
							href={`/courses/edit?id=${currentCourse.id}`}>
							<Pencil className='h-4 w-4' />
							Edit
						</Link>
					</Button>
				</div>
				<Title
					time={currentNote.startTime.toDateString()}
					title={currentNote.content.slice(0, 20)}
				/>
				<Time note={currentNote} />
				<Content note={currentNote} course={currentCourse} />
			</div>
			<div className='flex h-full w-48 shrink-0 flex-col gap-8 overflow-y-scroll scrollbar-hide'>
				{thisCourseNotes && (
					<SideNotes course={currentCourse} notes={thisCourseNotes} />
				)}
				{thisCourseTasks && (
					<Tasks course={currentCourse} tasks={thisCourseTasks} />
				)}
				<Teacher teacher={currentCourse.teacher} />
				<DeleteButton note={currentNote} />
			</div>
		</div>
	);
};

export default NotePage;
