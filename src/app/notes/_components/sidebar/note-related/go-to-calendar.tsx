'use client';

import { Button } from '@/components/button';
import { useSettings } from '@/hooks/use-settings';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
	note: Note;
};

const GoToCalendar = ({ note }: Props) => {
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
		<Button variant='secondary' onClick={handleGoToCalendar}>
			Go to calendar
		</Button>
	);
};

export default GoToCalendar;
