import { Metadata } from 'next';
import CoursesPage from './_components/courses-page';

export const metadata: Metadata = {
	title: 'Notecal | Courses',
	robots: {
		index: false,
	},
};

const page = () => <CoursesPage />;

export default page;
