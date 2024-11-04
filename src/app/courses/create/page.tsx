import { Metadata } from 'next';
import CreateCoursePage from '../_components/create-course-page';

export const metadata: Metadata = {
	title: 'Edit a course',
	robots: {
		index: false,
	},
};

const page = () => <CreateCoursePage />;

export default page;
