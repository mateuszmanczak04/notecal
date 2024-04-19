import { auth } from '@/auth';
import CreateTask from '@/components/tasks/create-task';
import { db } from '@/lib/db';

const CreateTaskPage = async () => {
	const session = await auth();
	const courses = (
		await db.course.findMany({
			where: { userId: session?.user?.id },
		})
	).map(c => ({ name: c.name, id: c.id }));

	return <CreateTask courses={courses} />;
};

export default CreateTaskPage;
