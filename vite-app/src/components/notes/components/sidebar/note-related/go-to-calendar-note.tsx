import { useNavigate } from 'react-router';
import { useSettings } from '../../../../../hooks/use-settings';
import { T_Note } from '../../../../../types';

type Props = {
	note: T_Note;
};

/**
 * Button linking to the /calendar page with the note's start time as the first seen day.
 */
const GoToCalendarNote = ({ note }: Props) => {
	const { goToDay } = useSettings();
	const navigate = useNavigate();

	/**
	 * Go to the day of the note in the calendar.
	 * Note's start time is used to determine the first seen day in the grid.
	 */
	const handleGoToCalendar = () => {
		if (!note.startTime || !note.endTime) return;
		goToDay(note.startTime);
		navigate('/calendar');
	};

	return (
		<p className='underline opacity-75' onClick={handleGoToCalendar}>
			See this note in the calendar
		</p>
	);
};

export default GoToCalendarNote;
