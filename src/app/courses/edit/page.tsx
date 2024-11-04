import { Metadata } from 'next';
import EditCoursePage from '../_components/edit-course-page';

export const metadata: Metadata = {
	title: 'Edit a course',
	robots: {
		index: false,
	},
};

const page = () => <EditCoursePage />;

export default page;
