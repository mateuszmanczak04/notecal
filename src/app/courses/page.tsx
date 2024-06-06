import CoursesList from '@/components/courses/courses-list';
import CreateCourseLink from '@/components/courses/create-course-link';

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
