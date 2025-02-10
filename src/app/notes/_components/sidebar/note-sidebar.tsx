'use client';

import { useSettings } from '@/hooks/use-settings';
import { Course as T_Course, Note as T_Note } from '@prisma/client';
import CourseRelated from './course-related/course-related';
import CourseUsefulLinks from './course-useful-links';
import CustomizeSidebar from './customize-sidebar';
import NoteDangerZone from './note-danger-zone';
import NoteRelated from './note-related/note-related';
import NoteTasks from './note-tasks/note-tasks';
import NotesSettings from './notes-settings';
import SideNotes from './side-notes/side-notes';
import { useResizeSidebar } from './use-resize-sidebar';

type T_Props = {
	course: T_Course;
	currentNote?: T_Note;
};

const NoteSidebar = ({ course, currentNote }: T_Props) => {
	const { sidebarElements } = useSettings();

	const { handleMouseDown, handleMouseUp, sidebarRef, noteSidebarWidth } = useResizeSidebar();

	return (
		<aside
			ref={sidebarRef}
			className='relative flex h-screen w-full shrink-0 flex-col overflow-y-scroll bg-white pb-32 scrollbar-hide md:w-72 lg:w-80 xl:w-72 2xl:w-96 dark:border-neutral-600 dark:bg-neutral-900'
			style={{
				width: noteSidebarWidth,
			}}>
			{sidebarElements.courseRelated && <CourseRelated course={course} />}
			{sidebarElements.notesList && <SideNotes currentCourse={course} />}
			{sidebarElements.usefulLinks && <CourseUsefulLinks course={course} />}
			{sidebarElements.tasks && <NoteTasks course={course} />}
			{/* TODO: fix useDatePickerFunctionality to not be fired on every click outside */}
			{sidebarElements.noteRelated && currentNote && <NoteRelated note={currentNote} />}
			{sidebarElements.settings && <NotesSettings />}
			{sidebarElements.dangerZone && <NoteDangerZone course={course} />}
			<CustomizeSidebar course={course} />
			<div
				className='absolute left-0 h-full w-1 cursor-ew-resize bg-neutral-200 dark:bg-neutral-700'
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}></div>
		</aside>
	);
};

export default NoteSidebar;
