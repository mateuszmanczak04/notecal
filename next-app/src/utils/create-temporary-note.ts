import { Note as T_Note } from '@prisma/client';
import { addMinutes } from 'date-fns';

export const createTemporaryNote = ({
	courseId,
	duration,
	startTime,
}: {
	courseId: string;
	duration?: number;
	startTime?: Date;
}): T_Note => {
	return {
		id: 'temp',
		courseId,
		createdAt: new Date(),
		updatedAt: new Date(),
		endTime: startTime && duration ? addMinutes(startTime, duration) : null,
		startTime: startTime || null,
		title: '',
		userId: 'temp',
	};
};
