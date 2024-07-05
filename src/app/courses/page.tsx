import CoursesList from '@/app/courses/_components/courses-list';
import CreateCourseLink from '@/app/courses/_components/create-course-link';

const page = () => {
	return (
		<>
			<h1 className='text-2xl font-bold'>Your Courses:</h1>
			<div className='mt-4 flex flex-col gap-4'>
				<CreateCourseLink />
				<CoursesList />
			</div>
		</>
	);
};

export default page;
