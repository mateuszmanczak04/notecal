import { Metadata } from 'next';
import CreateCourseForm from '../_components/create-course-form';

export const metadata: Metadata = {
	title: 'Notecal | Create a course',
	robots: {
		index: false,
	},
};

const page = () => {
	return (
		<main className='mx-auto mt-4 max-w-xl '>
			<h1 className='text-3xl font-bold'>Create a new course</h1>
			<CreateCourseForm />
		</main>
	);
};

export default page;
