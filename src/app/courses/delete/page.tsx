import { Metadata } from 'next';
import DeleteCoursePage from '../_components/delete-course-page';

export const metadata: Metadata = {
	title: 'Delete a course',
	robots: {
		index: false,
	},
};

const page = () => <DeleteCoursePage />;

export default page;
