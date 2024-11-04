import { Metadata } from 'next';
import CreateTaskPage from '../_components/create-task-page';

export const metadata: Metadata = {
	title: 'Create a new task',
	robots: {
		index: false,
	},
};

const page = () => <CreateTaskPage />;

export default page;
