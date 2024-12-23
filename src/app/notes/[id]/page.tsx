import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Content from '../_components/content';

export const metadata: Metadata = {
	title: 'Note',
	robots: {
		index: false,
	},
};

type Props = {
	params?: { [key: string]: string | undefined };
};

const page = async ({ params }: Props) => {
	const id = params?.id;

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

	const courseTasks = await db.task.findMany({
		where: {
			courseId: course.id,
		},
	});

	return (
		<div className='mx-auto flex h-full min-h-80 max-w-[1200px] flex-col gap-4 md:flex-row'>
			<div className='flex h-full flex-1 flex-col'>
				<Content note={note} course={course} />
			</div>
			<div className='flex w-full shrink-0 flex-col gap-8 md:w-56'>
				{/* List of other notes for this course */}
				{/* {courseNotes && <SideNotes course={course} notes={courseNotes} />} */}

				{/* Tasks related to this course */}
				{/* {courseTasks && <Tasks course={course} tasks={courseTasks} />} */}

				{/* Teacher */}
				{/* <Teacher teacher={course.teacher} /> */}

				{/* Change the course for this note */}
				{/* <ChangeCourse currentCourse={course} note={note} courses={courses} /> */}

				{/* Link to edit course */}
				{/* <Button asChild variant='secondary'>
					<Link prefetch href={`/courses/edit?id=${course.id}`}>
						<Pencil className='h-4 w-4' />
						Edit course
					</Link>
				</Button> */}

				{/* Current note time */}
				{/* <Time note={note} /> */}

				{/* Delete note button */}
				{/* <DeleteButton note={note} /> */}
			</div>
		</div>
	);
};

export default page;
