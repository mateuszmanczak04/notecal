'use client';

import { useSettings } from '@/hooks/use-settings';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
	note: Note;
};

/**
 * Button linking to the /calendar page with the note's start time as the first seen day.
 */
const GoToCalendarNote = ({ note }: Props) => {
	const { goToDay } = useSettings();
	const router = useRouter();

	/**
	 * Go to the day of the note in the calendar.
	 * Note's start time is used to determine the first seen day in the grid.
	 */
	const handleGoToCalendar = () => {
		if (!note.startTime || !note.endTime) return;
		goToDay(note.startTime);
		router.push('/calendar');
	};

	return (
		<p className='cursor-pointer underline opacity-75' onClick={handleGoToCalendar}>
			See this note in the calendar
		</p>
	);
};

export default GoToCalendarNote;
