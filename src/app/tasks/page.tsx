import { Metadata } from 'next';
import TasksPage from './_components/tasks-page';

export const metadata: Metadata = {
	title: 'Tasks',
	robots: {
		index: false,
	},
};

const page = () => <TasksPage />;

export default page;
