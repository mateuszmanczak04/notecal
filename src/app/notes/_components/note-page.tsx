'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { useTasks } from '@/hooks/use-tasks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChangeCourse from './change-course';
import Content from './content';
import CourseColor from './course-color';
import CourseName from './course-name';
import CourseTeacher from './course-teacher';
import DeleteCourseButton from './delete-course-button';
import EndTime from './end-time';
import GoToCalendar from './go-to-calendar';
import SideNotes from './side-notes';
import StartTime from './start-time';
import Tasks from './tasks';
import UsefulLinks from './useful-links';

const NotePage = () => {
	const params = useParams<{ noteId: string }>();
	const noteId = params.noteId;
	const router = useRouter();

	const { data: notes } = useNotes();
	const { data: courses } = useCourses();
	const { data: tasks } = useTasks();

	// Should not occur in normal conditions as we prefetch
	// all this data on first load
	useEffect(() => {
		if (!notes || !courses || !tasks) return;

		const currentNote = notes.find(note => note.id === noteId);
		if (!currentNote) {
			router.replace('/courses');
			return;
		}

		const currentCourse = courses.find(course => course.id === currentNote?.courseId);
		if (!currentCourse) {
			router.push('/courses');
			return;
		}
	}, [notes, courses, tasks, noteId, router]);

	if (!notes || !courses || !tasks) return;

	const currentNote = notes.find(note => note.id === noteId);
	const currentCourse = courses.find(course => course.id === currentNote?.courseId);
	const currentCourseTasks = tasks.filter(task => task.courseId === currentCourse?.id);
	const currentCourseNotes = notes.filter(note => note.courseId === currentCourse?.id);

	if (!currentNote || !currentCourse) return;

	return (
		<main className='mx-auto flex h-full min-h-80 max-w-screen-2xl flex-col gap-4 md:flex-row'>
			<article className='flex h-full flex-1 flex-col'>
				<Content note={currentNote} course={currentCourse} />
			</article>

			<aside className='flex h-full w-full shrink-0 flex-col gap-y-4 overflow-y-scroll pb-64 scrollbar-hide md:w-72 lg:w-80 xl:w-72 2xl:w-96'>
				{/* Course related */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Course related</legend>
					<CourseName course={currentCourse} />
					<CourseColor course={currentCourse} />
					<CourseTeacher course={currentCourse} />
					<GoToCalendar note={currentNote} />
				</fieldset>

				{/* List of other notes from this course */}
				<SideNotes
					currentCourseNotes={currentCourseNotes}
					currentNoteId={noteId}
					currentCourse={currentCourse}
				/>

				{/* Useful links */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Useful links</legend>
					<UsefulLinks course={currentCourse} />
				</fieldset>

				{/* Tasks */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Tasks</legend>
					<Tasks tasks={currentCourseTasks} course={currentCourse} />
				</fieldset>

				{/* Note related */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Note related</legend>
					<ChangeCourse currentCourse={currentCourse} note={currentNote} />
					<StartTime note={currentNote} />
					<EndTime note={currentNote} />
				</fieldset>

				{/* Danger zone */}
				<fieldset className='space-y-4 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
					<legend className='px-2'>Danger zone</legend>
					<DeleteCourseButton id={currentCourse.id} />
				</fieldset>
			</aside>
		</main>
	);
};

export default NotePage;
