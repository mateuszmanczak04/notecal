'use client';

import { useCalendarContext } from '@/app/calendar/_context/calendar-context';
import { Button } from '@/components/button';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
	note: Note;
};

const GoToCalendar = ({ note }: Props) => {
	const { goToDay } = useCalendarContext();
	const router = useRouter();

	/**
	 * Go to the day of the note in the calendar.
	 * Note's start time is used to determine the first seen day in the grid.
	 */
	const handleGoToCalendar = () => {
		goToDay(note.startTime);
		router.push('/calendar');
	};

	return (
		<Button variant='secondary' onClick={handleGoToCalendar}>
			Go to calendar
		</Button>
	);
};

export default GoToCalendar;
