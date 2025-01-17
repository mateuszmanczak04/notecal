import { T_CreateCourseInput } from '@/app/courses/_actions/create-course';
import { Course } from '@prisma/client';

export const createTemporaryCourse = ({ color, name, teacher }: T_CreateCourseInput): Course => {
	return {
		id: 'temp',
		name,
		teacher,
		color,
		userId: 'temp',
		usefulLinks: '',
		createdAt: new Date(),
		updatedAt: new Date(),
	};
};
