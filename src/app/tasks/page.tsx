import { Metadata } from 'next';
import CreateTaskForm from './_components/create-task-form';
import SortTasks from './_components/sort-tasks';
import Tasks from './_components/tasks';

export const metadata: Metadata = {
	title: 'Notecal | Tasks',
	robots: {
		index: false,
	},
};

const page = () => {
	return (
		<main className='mx-auto max-w-3xl space-y-4 p-4'>
			<CreateTaskForm />
			<SortTasks />
			<Tasks />
		</main>
	);
};

export default page;
