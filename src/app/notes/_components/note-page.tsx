'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { useSearchParams } from 'next/navigation';
import Editor from './editor/editor';
import NoSelectedNoteEditor from './editor/no-selected-note-editor';
import NoteSidebar from './sidebar/note-sidebar';

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
		<main className='mx-auto flex h-full min-h-80 flex-col md:flex-row'>
			<article className='flex h-screen flex-1 flex-col'>
				{currentNote ? (
					<Editor note={currentNote} course={currentCourse} />
				) : (
					<NoSelectedNoteEditor course={currentCourse} />
				)}
			</article>

			<NoteSidebar course={currentCourse} currentNote={currentNote} />
		</main>
	);
};

export default NotePage;
