import { Metadata } from 'next';
import Tasks from './_components/tasks';

export const metadata: Metadata = {
	title: 'Notecal |Tasks',
	robots: {
		index: false,
	},
};

const page = () => {
	return (
		<main className='mx-auto max-w-3xl space-y-8'>
			{/* <CreateTaskForm /> */}
			{/* <SortTasks /> */}
			<Tasks />
		</main>
	);
};

export default page;
