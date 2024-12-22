import LoadingSpinner from '@/components/common/loading-spinner';
import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CreateTask from './_components/create-task';
import SortTasks from './_components/sort-tasks';
import Tasks from './_components/tasks';

export const metadata: Metadata = {
	title: 'Notecal |Tasks',
	robots: {
		index: false,
	},
};

const page = async () => {
	const { user: authUser } = (await getAuthStatus()) as { user: { id: string } };

	const user = await db.user.findUnique({ where: { id: authUser.id } });

	if (!user) {
		// Should not occur in normal conditions
		(await cookies()).delete('authToken');
		redirect('/auth/login');
	}

	const tasksPromise = db.task.findMany({
		where: {
			userId: authUser.id,
		},
		orderBy: {
			[user.orderTasks]: 'desc',
		},
	});

	return (
		<main className='mx-auto max-w-[800px] space-y-8'>
			<CreateTask />
			<SortTasks />

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
