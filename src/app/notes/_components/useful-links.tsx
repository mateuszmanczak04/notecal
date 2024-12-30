'use client';

import { Course } from '@prisma/client';

type Props = {
	course: Course;
};

const UsefulLinks = ({ course }: Props) => {
	return <div>Useful links TODO {course.name}</div>;
};

export default UsefulLinks;
