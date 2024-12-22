import LoadingSpinner from '@/components/common/loading-spinner';
import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CreateTask from './_components/create-task';
import Tasks from './_components/tasks';

export const metadata: Metadata = {
	title: 'Notecal |Tasks',
	robots: {
		index: false,
	},
};

const page = async () => {
	const { user } = (await getAuthStatus()) as { user: { id: string } };

	const tasksPromise = db.task.findMany({
		where: {
			userId: user.id,
		},
	});

	return (
		<main className='mx-auto max-w-[800px] space-y-8'>
			<CreateTask />
			{/* <SortTasks /> */}

			<Suspense
				fallback={
					<div className='grid place-content-center'>
						<LoadingSpinner />
					</div>
				}>
				<Tasks tasksPromise={tasksPromise} />
			</Suspense>
		</main>
	);
};

export default page;
