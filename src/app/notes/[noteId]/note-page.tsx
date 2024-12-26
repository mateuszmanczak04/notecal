'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Button } from '@/components/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ChangeCourse from '../_components/change-course';
import Content from '../_components/content';
import CourseName from '../_components/course-name';
import DeleteNoteButton from '../_components/delete-note-button';
import EndTime from '../_components/end-time';
import SideNotes from '../_components/side-notes';
import StartTime from '../_components/start-time';
import Tasks from '../_components/tasks';
import Teacher from '../_components/teacher';

const NotePage = () => {
	const params = useParams<{ noteId: string }>();
	const noteId = params.noteId;

	const { notes, courses, tasks } = useAppContext();

	const currentNote = notes.find(note => note.id === noteId);
	const currentCourse = courses.find(course => course.id === currentNote?.courseId);
	const currentCourseTasks = tasks.filter(task => task.courseId === currentCourse?.id);
	const currentCourseNotes = notes.filter(note => note.courseId === currentCourse?.id);

	if (!currentNote) {
		// TODO: show nice looking error
		return <p>Note not found</p>;
	}

	// Should not occur in normal conditions as every note should have a corresponding course
	if (!currentCourse) {
		return <p>Course not found</p>;
	}

	return (
		<main className='mx-auto flex h-full min-h-80 max-w-[1200px] flex-col gap-4 md:flex-row'>
			<article className='flex h-full flex-1 flex-col'>
				<Content note={currentNote} course={currentCourse} />
			</article>

			<aside className='flex h-full w-full shrink-0 flex-col gap-8 overflow-x-clip overflow-y-scroll scrollbar-hide md:w-56'>
				{/* Name of the course */}
				<CourseName name={currentCourse.name} />

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

				{/* Link to edit course */}
				<Button asChild variant='secondary'>
					<Link prefetch href={`/courses/edit?id=${currentCourse.id}`}>
						<Pencil className='h-4 w-4' />
						Edit course
					</Link>
				</Button>

				{/* Current note time  */}
				<StartTime note={currentNote} />
				<EndTime note={currentNote} />

				{/* Delete note button */}
				<DeleteNoteButton id={currentNote.id} />
			</aside>
		</main>
	);
};

export default NotePage;
