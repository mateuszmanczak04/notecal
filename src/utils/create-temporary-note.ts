import { T_CreateNoteInput } from '@/app/notes/_actions/create-note';
import { Note as T_Note } from '@prisma/client';
import { addMinutes } from 'date-fns';
import { getDefaultNewNoteContent } from './get-default-new-note-content';

export const createTemporaryNote = ({ courseId, duration, startTime }: T_CreateNoteInput): T_Note => {
	return {
		id: 'temp',
		content: getDefaultNewNoteContent(),
		courseId,
		createdAt: new Date(),
		updatedAt: new Date(),
		endTime: startTime && duration ? addMinutes(startTime, duration) : null,
		startTime: startTime || null,
		title: '',
		userId: 'temp',
	};
};
