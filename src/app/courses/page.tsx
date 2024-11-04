import { Metadata } from 'next';
import Courses from './_components/courses';

export const metadata: Metadata = {
	title: 'Courses',
	robots: {
		index: false,
	},
};

const page = () => <Courses />;

export default page;
