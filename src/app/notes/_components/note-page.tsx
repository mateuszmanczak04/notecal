'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { useSettings } from '@/hooks/use-settings';
import { useSearchParams } from 'next/navigation';
import Content from './content';
import CourseColor from './course-color';
import CourseName from './course-name';
import CourseTeacher from './course-teacher';
import CustomizeSidebar from './customize-sidebar';
import EndTime from './end-time';
import GoToCalendar from './go-to-calendar';
import NoNoteContent from './no-note-content';
import NoteDangerZone from './note-danger-zone';
import NotesSettings from './notes-settings';
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
	const { sidebarElements } = useSettings();

	if (!notes || !courses) return;

	const currentNote = notes.find(note => note.id === noteId);
	// If search params contain noteId, filter courses by this note's courseId
	// Otherwise, filter courses by courseId from search params
	const currentCourse = currentNote
		? courses.find(course => course.id === currentNote.courseId)
		: courses.find(course => course.id === courseId);

	if (!currentCourse) return <p>Course not found</p>;

	return (
		<main className='mx-auto flex h-full min-h-80 max-w-screen-2xl flex-col md:flex-row'>
			<article className='flex h-screen flex-1 flex-col'>
				{currentNote ? (
					<Content note={currentNote} course={currentCourse} />
				) : (
					<NoNoteContent course={currentCourse} />
				)}
			</article>

			<aside className='flex h-screen w-full shrink-0 flex-col gap-y-4 overflow-y-scroll p-4 pb-64 scrollbar-hide md:w-72 lg:w-80 xl:w-72 2xl:w-96'>
				{/* Course related */}
				{sidebarElements.courseRelated && (
					<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
						<legend className='px-2'>Course related</legend>
						<CourseName course={currentCourse} />
						<CourseColor course={currentCourse} />
						<CourseTeacher course={currentCourse} />
					</fieldset>
				)}

				{sidebarElements.notesList && <SideNotes currentCourse={currentCourse} />}

				{sidebarElements.usefulLinks && <UsefulLinks course={currentCourse} />}

				{/* Tasks */}
				{sidebarElements.tasks && (
					<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
						<legend className='px-2'>Tasks</legend>
						<Tasks course={currentCourse} />
					</fieldset>
				)}

				{/* Note related */}
				{sidebarElements.noteRelated && currentNote && (
					<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
						<legend className='px-2'>Note related</legend>
						<StartTime note={currentNote} />
						<EndTime note={currentNote} />
						{currentNote.startTime && currentNote.endTime && <GoToCalendar note={currentNote} />}
					</fieldset>
				)}

				{sidebarElements.dangerZone && <NoteDangerZone id={currentCourse.id} />}

				{sidebarElements.settings && <NotesSettings />}

				<CustomizeSidebar />
			</aside>
		</main>
	);
};

export default NotePage;
