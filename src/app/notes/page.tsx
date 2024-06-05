import { auth } from '@/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();

	const latestNote = await db.note.findMany({
		where: { userId: session?.user?.id },
		orderBy: { startTime: 'desc' },
		take: 1,
		select: { id: true, courseId: true },
	});

	if (latestNote.length === 0) {
		redirect('/courses');
	}

	redirect(`/notes/${latestNote[0].courseId}/${latestNote[0].id}`);
};

export default page;
