import { Course as T_Course } from '@prisma/client';
import CourseColor from './course-color';
import CourseName from './course-name';
import CourseTeacher from './course-teacher';

type T_Props = {
	course: T_Course;
};

const CourseRelated = ({ course }: T_Props) => {
	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<CourseName course={course} />
			<CourseTeacher course={course} />
			<CourseColor course={course} />
		</div>
	);
};

export default CourseRelated;
