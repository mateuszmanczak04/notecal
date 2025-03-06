import Courses from './components/courses';
import CreateCourseDialog from './components/create-course-dialog';

// export const metadata: Metadata = {
// 	title: 'Notecal | Courses',
// 	robots: {
// 		index: false,
// 	},
// };

const CoursesPage = () => {
	return (
		<main className='grid gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			<Courses />
			<CreateCourseDialog />
		</main>
	);
};

export default CoursesPage;
