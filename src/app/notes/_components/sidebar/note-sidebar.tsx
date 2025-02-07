'use client';

import { useSettings } from '@/hooks/use-settings';
import { Course as T_Course, Note as T_Note } from '@prisma/client';
import CourseRelated from './course-related';
import CustomizeSidebar from './customize-sidebar';
import NoteDangerZone from './note-danger-zone';
import GoToCalendarNote from './note-related/go-to-calendar-note';
import NoteEndTime from './note-related/note-end-time';
import NoteStartTime from './note-related/note-start-time';
import NotesSettings from './notes-settings';
import SideNotesList from './side-notes/side-notes-list';
import NoteTasks from './tasks/note-tasks';
import UsefulLinks from './useful-links';

type T_Props = {
	course: T_Course;
	currentNote?: T_Note;
};

const NoteSidebar = ({ course, currentNote }: T_Props) => {
	const { sidebarElements } = useSettings();

	return (
		<aside className='flex h-screen w-full shrink-0 flex-col gap-y-4 overflow-y-scroll border-l border-neutral-200 bg-white p-4 pb-64 scrollbar-hide md:w-72 lg:w-80 xl:w-72 2xl:w-96 dark:border-neutral-600 dark:bg-neutral-900'>
			{/* Course related */}
			{sidebarElements.courseRelated && <CourseRelated course={course} />}

			{sidebarElements.notesList && <SideNotesList currentCourse={course} />}

			{sidebarElements.usefulLinks && <UsefulLinks course={course} />}

			{/* Tasks */}
			{sidebarElements.tasks && (
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Tasks</legend>
					<NoteTasks course={course} />
				</fieldset>
			)}

			{/* Note related */}
			{sidebarElements.noteRelated && currentNote && (
				<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
					<legend className='px-2'>Note related</legend>
					<NoteStartTime note={currentNote} />
					<NoteEndTime note={currentNote} />
					{currentNote.startTime && currentNote.endTime && <GoToCalendarNote note={currentNote} />}
				</fieldset>
			)}

			{sidebarElements.dangerZone && <NoteDangerZone id={course.id} />}

			{sidebarElements.settings && <NotesSettings />}

			<CustomizeSidebar />
		</aside>
	);
};

export default NoteSidebar;
