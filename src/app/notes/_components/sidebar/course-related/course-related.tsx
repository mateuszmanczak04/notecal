import CourseColor from './course-color';
import CourseName from './course-name';
import CourseTeacher from './course-teacher';

const CourseRelated = () => {
	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<CourseName />
			<CourseTeacher />
			<CourseColor />
		</div>
	);
};

export default CourseRelated;
