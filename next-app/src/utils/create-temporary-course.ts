import { Course } from '@prisma/client';

export const createTemporaryCourse = ({
	color,
	name,
	teacher,
}: {
	color: string;
	name: string;
	teacher: string;
}): Course => {
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
