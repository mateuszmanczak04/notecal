import { T_Course } from '../types';

export const createTemporaryCourse = ({
	color,
	name,
	teacher,
}: {
	color: string;
	name: string;
	teacher: string;
}): T_Course => {
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
