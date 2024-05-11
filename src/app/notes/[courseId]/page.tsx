import { auth } from '@/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { courseId: string } }) => {
	const session = await auth();

	const latestNote = await db.note.findMany({
		where: { userId: session?.user?.id, courseId: params.courseId },
		orderBy: { startTime: 'desc' },
		take: 1,
		select: { id: true, courseId: true },
	});

	if (latestNote.length === 0) {
		// todo - display button to create a new note / redirect to create note page
		redirect('/courses');
	}

	redirect(`/notes/${latestNote[0].courseId}/${latestNote[0].id}`);
};

export default page;
