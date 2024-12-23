import LoadingSpinner from '@/components/loading-spinner';
import { getTasks, getUser } from '@/utils/cached-queries';
import { Metadata } from 'next';
import { Suspense } from 'react';
import logout from '../auth/_actions/logout';
import CreateTaskForm from './_components/create-task-form';
import SortTasks from './_components/sort-tasks';
import Tasks from './_components/tasks';

export const metadata: Metadata = {
	title: 'Notecal |Tasks',
	robots: {
		index: false,
	},
};

const page = async () => {
	const user = await getUser();

	// Should not occur in normal conditions
	if (!user) return logout();

	const tasks = await getTasks();

	return (
		<main className='mx-auto max-w-[800px] space-y-8'>
			<CreateTaskForm />
			<SortTasks />

			<Suspense
				fallback={
					<div className='grid place-content-center'>
						<LoadingSpinner />
					</div>
				}>
				<Tasks tasks={tasks} />
			</Suspense>
		</main>
	);
};

export default page;
