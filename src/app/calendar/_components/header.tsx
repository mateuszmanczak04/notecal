'use client';

import { useCalendarContext } from '../_context/calendar-context';

const Header = () => {
	const { currentFirstDay } = useCalendarContext();
	const currentMonth = currentFirstDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = currentFirstDay.getFullYear();

	return (
		<h2 className='text-3xl font-bold'>
			{currentMonth} {currentYear}
		</h2>
	);
};

export default Header;
