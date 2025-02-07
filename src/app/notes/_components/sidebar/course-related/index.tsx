import { Course as T_Course } from '@prisma/client';
import CourseColor from './course-color';
import CourseName from './course-name';
import CourseTeacher from './course-teacher';

type T_Props = {
	course: T_Course;
};

const CourseRelated = ({ course }: T_Props) => {
	return (
		<fieldset className='flex flex-col gap-y-2 rounded-xl border border-neutral-200 p-4 pt-2 dark:border-neutral-700'>
			<legend className='px-2'>Course related</legend>
			<CourseName course={course} />
			<CourseTeacher course={course} />
			<CourseColor course={course} />
		</fieldset>
	);
};

export default CourseRelated;
