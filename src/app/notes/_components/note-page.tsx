'use client';

import { useCourses } from '@/app/_hooks/use-courses';
import { useNotes } from '@/app/_hooks/use-notes';
import { useTasks } from '@/app/_hooks/use-tasks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChangeCourse from './change-course';
import Content from './content';
import CourseColor from './course-color';
import CourseName from './course-name';
import CourseTeacher from './course-teacher';
import DeleteCourseButton from './delete-course-button';
import DeleteNoteButton from './delete-note-button';
import EndTime from './end-time';
import SideNotes from './side-notes';
import StartTime from './start-time';
import Tasks from './tasks';

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
				<Content note={currentNote} />
			</article>

			<aside className='h-full w-full shrink-0 space-y-4 overflow-x-clip overflow-y-scroll py-2 scrollbar-hide md:w-72'>
				{/* Course related */}
				<fieldset className='space-y-4 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
					<legend className='px-2'>Course related</legend>
					{/* <SectionHeading text='Course related' /> */}
					<CourseName course={currentCourse} />
					<CourseColor course={currentCourse} />
					<CourseTeacher teacher={currentCourse.teacher} />
				</fieldset>

				{/* List of other notes from this course */}
				<SideNotes
					currentCourseNotes={currentCourseNotes}
					currentNoteId={noteId}
					currentCourse={currentCourse}
				/>

				{/* Tasks */}
				<fieldset className='space-y-4 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
					<legend className='px-2'>Tasks</legend>
					<Tasks tasks={currentCourseTasks} course={currentCourse} />
				</fieldset>

				{/* Note related */}
				<fieldset className='space-y-4 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
					<legend className='px-2'>Note related</legend>
					<ChangeCourse currentCourse={currentCourse} note={currentNote} />
					<StartTime note={currentNote} />
					<EndTime note={currentNote} />
					<DeleteNoteButton id={currentNote.id} />
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
