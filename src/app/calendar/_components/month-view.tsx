'use client';

import { addDays, format, getDay, getDaysInMonth, startOfMonth } from 'date-fns';
import React from 'react';
import { useCalendarContext } from '../_context/calendar-context';

const Tile = ({ children }: { children?: React.ReactNode }) => (
	<div className='grid place-content-center border-b border-r border-neutral-300 py-10 last-of-type:rounded-br-xl dark:border-neutral-600'>
		{children}
	</div>
);

const MonthView = () => {
	const { currentFirstDay } = useCalendarContext();

	const firstDayOfMonth = startOfMonth(currentFirstDay);
	const amountOfDaysInMonth = getDaysInMonth(currentFirstDay);
	const daysInMonth = new Array(amountOfDaysInMonth).fill(firstDayOfMonth).map((day, index) => addDays(day, index));

	/**
	 * Amount of empty days before the first one, for example:
	 * 0 for monday as first day of the month
	 * 1 for tuesday
	 * 2 for wednesday etc.
	 * Transformed to make Monday the first one instead of Sunday.
	 */
	const daysOffset = (getDay(firstDayOfMonth) + 6) % 7;

	/**
	 * Combination of empty grid tiles before the first day
	 * and all days of the current month.
	 */
	const renderedTiles: (Date | null)[] = [...new Array(daysOffset).fill(null), ...daysInMonth];

	return (
		<div className='mt-4 grid grid-cols-7 overflow-hidden rounded-xl border-l border-t border-neutral-300 dark:border-neutral-600'>
			{/* Week day names */}
			{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(dayName => (
				<Tile key={dayName}>{dayName}</Tile>
			))}
			{/* Month days */}
			{renderedTiles.map(tile => {
				if (tile === null) {
					return <Tile key={Math.random()} />;
				}
				return <Tile key={tile.toString()}>{format(tile, 'd')}</Tile>;
			})}
		</div>
	);
};

export default MonthView;
