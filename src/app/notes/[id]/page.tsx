import { Button } from '@/components/button';
import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { Pencil } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChangeCourse from '../_components/change-course';
import Content from '../_components/content';
import DeleteNoteButton from '../_components/delete-note-button';
import SideNotes from '../_components/side-notes';
import Tasks from '../_components/tasks';
import Teacher from '../_components/teacher';
import Time from '../_components/time';

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
	console.log('LOADING');

	const id = (await params)?.id;

	if (!id) notFound();

	// We can assume that use is authenticated because of the middleware
	const { user } = (await getAuthStatus()) as { user: { id: string } };

	const note = await db.note.findUnique({
		where: {
			id,
			userId: user.id,
		},
	});

	if (!note) notFound();

	const course = await db.course.findUnique({
		where: {
			id: note.courseId,
		},
	});

	// Should not occur in normal conditions
	if (!course) notFound();

	const courseNotes = await db.note.findMany({
		where: {
			courseId: course.id,
		},
	});

	const courses = await db.course.findMany({
		where: {
			userId: user.id,
		},
	});

	const courseTasks = await db.task.findMany({
		where: {
			courseId: course.id,
		},
	});

	console.log('LOADED');

	return (
		<div className='mx-auto flex h-full min-h-80 max-w-[1200px] flex-col gap-4 md:flex-row'>
			<div className='flex h-full flex-1 flex-col'>
				<Content note={note} course={course} />
			</div>

			<div className='flex w-full shrink-0 flex-col gap-8 md:w-56'>
				{/* List of other notes for this course */}
				{courseNotes && <SideNotes currentNodeId={id} course={course} notes={courseNotes} />}

				{/* Tasks related to this course */}
				{courseTasks && <Tasks course={course} tasks={courseTasks} />}

				{/* Teacher */}
				<Teacher teacher={course.teacher} />

				{/* Change the course for this note */}
				<ChangeCourse currentCourse={course} note={note} courses={courses} />

				{/* Link to edit course */}
				<Button asChild variant='secondary'>
					<Link prefetch href={`/courses/edit?id=${course.id}`}>
						<Pencil className='h-4 w-4' />
						Edit course
					</Link>
				</Button>

				{/* Current note time */}
				<Time note={note} />

				{/* Delete note button */}
				<DeleteNoteButton id={note.id} />
			</div>
		</div>
	);
};

export default page;
