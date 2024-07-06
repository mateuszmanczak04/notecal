'use client';

import { type Note } from '@prisma/client';
import { FC } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import { differenceInCalendarDays } from 'date-fns';
import Link from 'next/link';
import { AMOUNT_OF_DAYS } from './grid';

interface NoteProps {
	note: Note;
}

const Note: FC<NoteProps> = ({ note }) => {
	const { currentFirstDay } = useCalendarContext();

	const getLeftOffset = () => {
		const daysFromFirstDay = differenceInCalendarDays(
			note.startTime,
			currentFirstDay,
		);
		return daysFromFirstDay * (100 / AMOUNT_OF_DAYS) + '%';
	};

	const getTopOffset = () => {
		const hours = note.startTime.getHours();
		const minutes = note.startTime.getMinutes();
		const totalMinutes = 60 * hours + minutes;
		const totalMinutesIn24h = 24 * 60;
		const ratio = totalMinutes / totalMinutesIn24h;
		return ratio * 100 + '%';
	};

	const getWidth = () => {
		return (100 / AMOUNT_OF_DAYS) * 0.9 + '%';
	};

	const getHeight = () => {
		if (
			note.startTime.getFullYear() !== note.endTime.getFullYear() ||
			note.startTime.getMonth() !== note.endTime.getMonth() ||
			note.startTime.getDate() !== note.endTime.getDate()
		) {
			console.log('100% height');
			return '100%';
		}
		const startHours = note.startTime.getHours();
		const startMinutes = note.startTime.getMinutes();
		const totalStartMinutes = 60 * startHours + startMinutes;

		const endHours = note.endTime.getHours();
		const endMinutes = note.endTime.getMinutes();
		const totalEndMinutes = 60 * endHours + endMinutes;

		const totalDuration = totalEndMinutes - totalStartMinutes;
		const totalMinutesIn24h = 24 * 60;
		const ratio = totalDuration / totalMinutesIn24h;
		return ratio * 100 + '%';
	};

	return (
		<Link
			href={`/notes/${note.courseId}/${note.id}`}
			className='absolute z-20 select-none rounded-md bg-primary-500 p-4 text-white transition hover:bg-primary-400'
			style={{
				top: getTopOffset(),
				left: getLeftOffset(),
				width: getWidth(),
				height: getHeight(),
			}}>
			{note.content.slice(0, 20)}
		</Link>
	);
};

export default Note;
