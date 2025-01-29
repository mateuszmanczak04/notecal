'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { useSearchParams } from 'next/navigation';
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
	const searchParams = useSearchParams();
	const noteId = searchParams.get('noteId');
	const courseId = searchParams.get('courseId');

	const { data: notes } = useNotes();
	const { data: courses } = useCourses();

	if (!notes || !courses) return;

	const currentNote = notes.find(note => note.id === noteId);
	// If search params contain noteId, filter courses by this note's courseId
	// Otherwise, filter courses by courseId from search params
	const currentCourse = currentNote
		? courses.find(course => course.id === currentNote.courseId)
		: courses.find(course => course.id === courseId);

	if (!currentCourse) return <p>Course not found</p>;

	return (
		<main className='mx-auto flex h-full min-h-80 max-w-screen-2xl flex-col gap-4 md:flex-row'>
			<article className='flex h-full flex-1 flex-col'>
				{currentNote ? <Content note={currentNote} course={currentCourse} /> : <p>Please select a note</p>}
			</article>

			<aside className='flex h-full w-full shrink-0 flex-col gap-y-4 overflow-y-auto pb-64 md:w-72 lg:w-80 xl:w-72 2xl:w-96'>
				{/* Course related */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Course related</legend>
					<CourseName course={currentCourse} />
					<CourseColor course={currentCourse} />
					<CourseTeacher course={currentCourse} />
				</fieldset>

				{/* List of other notes from this course */}
				<SideNotes currentCourse={currentCourse} />

				{/* Useful links */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Useful links</legend>
					<UsefulLinks course={currentCourse} />
				</fieldset>

				{/* Tasks */}
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Tasks</legend>
					<Tasks course={currentCourse} />
				</fieldset>

				{/* Note related */}
				{currentNote && (
					<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
						<legend className='px-2'>Note related</legend>
						<ChangeCourse currentCourse={currentCourse} note={currentNote} />
						<StartTime note={currentNote} />
						<EndTime note={currentNote} />
						{currentNote.startTime && currentNote.endTime && <GoToCalendar note={currentNote} />}
					</fieldset>
				)}

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
