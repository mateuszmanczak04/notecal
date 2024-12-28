'use client';

import { useCourses } from '@/app/_hooks/use-courses';
import { useNotes } from '@/app/_hooks/use-notes';
import { useTasks } from '@/app/_hooks/use-tasks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChangeCourse from '../_components/change-course';
import Content from '../_components/content';
import CourseColor from '../_components/course-color';
import CourseName from '../_components/course-name';
import DeleteCourseButton from '../_components/delete-course-button';
import DeleteNoteButton from '../_components/delete-note-button';
import EndTime from '../_components/end-time';
import SideNotes from '../_components/side-notes';
import StartTime from '../_components/start-time';
import Tasks from '../_components/tasks';
import Teacher from '../_components/teacher';

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
		<main className='mx-auto flex h-full min-h-80 max-w-[1200px] flex-col gap-4 md:flex-row'>
			<article className='flex h-full flex-1 flex-col'>
				<Content note={currentNote} />
			</article>

			<aside className='flex h-full w-full shrink-0 flex-col gap-8 overflow-x-clip overflow-y-scroll scrollbar-hide md:w-56'>
				{/* Name of the course */}
				<CourseName name={currentCourse.name} />

				{/* Color for the course */}
				<CourseColor course={currentCourse} />

				{/* List of other notes for this course */}
				<SideNotes
					currentCourseNotes={currentCourseNotes}
					currentNoteId={noteId}
					currentCourse={currentCourse}
				/>

				{/* Tasks related to this course TODO */}
				<Tasks tasks={currentCourseTasks} course={currentCourse} />

				{/* Teacher */}
				<Teacher teacher={currentCourse.teacher} />

				{/* Change the course for this note */}
				<ChangeCourse currentCourse={currentCourse} note={currentNote} />

				{/* Current note time  */}
				<StartTime note={currentNote} />
				<EndTime note={currentNote} />

				{/* Delete note button */}
				<DeleteNoteButton id={currentNote.id} />

				{/* Delete entire course button */}
				<DeleteCourseButton id={currentCourse.id} />
			</aside>
		</main>
	);
};

export default NotePage;
