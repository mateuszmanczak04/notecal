import Courses from './components/courses';
import CreateCourseDialog from './components/create-course-dialog';

const CoursesPage = () => {
	return (
		<main className='grid gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
			<title>Courses</title>
			<Courses />
			<CreateCourseDialog />
		</main>
	);
};

export default CoursesPage;
