'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { useSettings } from '@/hooks/use-settings';
import { useSearchParams } from 'next/navigation';
import Editor from './editor/editor';
import NoSelectedNoteEditor from './editor/no-selected-note-editor';
import CourseColor from './sidebar/course-related/course-color';
import CourseName from './sidebar/course-related/course-name';
import CourseTeacher from './sidebar/course-related/course-teacher';
import CustomizeSidebar from './sidebar/customize-sidebar';
import NoteDangerZone from './sidebar/note-danger-zone';
import EndTime from './sidebar/note-related/end-time';
import GoToCalendar from './sidebar/note-related/go-to-calendar';
import StartTime from './sidebar/note-related/start-time';
import NotesSettings from './sidebar/notes-settings';
import SideNotesList from './sidebar/side-notes/side-notes-list';
import NoteTasks from './sidebar/tasks/note-tasks';
import UsefulLinks from './sidebar/useful-links';

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
		<main className='mx-auto flex h-full min-h-80 flex-col md:flex-row'>
			<article className='flex h-screen flex-1 flex-col'>
				{currentNote ? (
					<Editor note={currentNote} course={currentCourse} />
				) : (
					<NoSelectedNoteEditor course={currentCourse} />
				)}
			</article>

			<aside className='flex h-screen w-full shrink-0 flex-col gap-y-4 overflow-y-scroll border-l border-neutral-200 bg-white p-4 pb-64 scrollbar-hide md:w-72 lg:w-80 xl:w-72 2xl:w-96 dark:border-neutral-600 dark:bg-neutral-900'>
				{/* Course related */}
				{sidebarElements.courseRelated && (
					<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
						<legend className='px-2'>Course related</legend>
						<CourseName course={currentCourse} />
						<CourseColor course={currentCourse} />
						<CourseTeacher course={currentCourse} />
					</fieldset>
				)}

				{sidebarElements.notesList && <SideNotesList currentCourse={currentCourse} />}

				{sidebarElements.usefulLinks && <UsefulLinks course={currentCourse} />}

				{/* Tasks */}
				{sidebarElements.tasks && (
					<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
						<legend className='px-2'>Tasks</legend>
						<NoteTasks course={currentCourse} />
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
