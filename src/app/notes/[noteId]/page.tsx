import { Button } from '@/components/button';
import { getCourseById, getNoteById } from '@/utils/cached-queries';
import { Pencil } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChangeCourse from '../_components/change-course';
import Content from '../_components/content';
import CourseName from '../_components/course-name';
import DeleteNoteButton from '../_components/delete-note-button';
import EndTime from '../_components/end-time';
import SideNotes from '../_components/side-notes';
import StartTime from '../_components/start-time';
import Tasks from '../_components/tasks';
import Teacher from '../_components/teacher';

export const metadata: Metadata = {
	title: 'Note',
	robots: {
		index: false,
	},
};

type Props = {
	params?: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({ params }: Props) => {
	const noteId = (await params)?.noteId;
	if (!noteId) notFound();

	const note = await getNoteById(noteId);
	if (!note) notFound();

	const course = await getCourseById(note.courseId);
	if (!course) notFound();

	return (
		<div className='mx-auto flex h-full min-h-80 max-w-[1200px] flex-col gap-4 md:flex-row'>
			<div className='flex h-full flex-1 flex-col'>
				<Content note={note} course={course} />
			</div>

			<div className='flex w-full shrink-0 flex-col gap-8 md:w-56'>
				{/* Name of the course */}
				<CourseName name={course.name} />

				{/* List of other notes for this course */}
				<SideNotes currentNoteId={noteId} course={course} />

				{/* Tasks related to this course */}
				<Tasks course={course} />

				{/* Teacher */}
				<Teacher teacher={course.teacher} />

				{/* Change the course for this note */}
				<ChangeCourse currentCourse={course} note={note} />

				{/* Link to edit course */}
				<Button asChild variant='secondary'>
					<Link prefetch href={`/courses/edit?id=${course.id}`}>
						<Pencil className='h-4 w-4' />
						Edit course
					</Link>
				</Button>

				{/* Current note time */}
				<StartTime note={note} />
				<EndTime note={note} />

				{/* Delete note button */}
				<DeleteNoteButton id={note.id} />
			</div>
		</div>
	);
};

export default page;
