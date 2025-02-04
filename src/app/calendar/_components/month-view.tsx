'use client';

import { useNotesWithTime } from '@/hooks/use-notes-with-time';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/utils/cn';
import { addDays, format, getDay, getDaysInMonth, isSameDay, startOfMonth } from 'date-fns';
import React, { useRef } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import MonthViewNote from './month-view-note';

const Tile = ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => {
	const ref = useRef<HTMLDivElement>(null!);

	const handleClick = (e: React.MouseEvent) => {
		if (ref.current === e.target) {
			onClick?.();
		}
	};

	return (
		<div
			ref={ref}
			onClick={handleClick}
			className={cn(
				'flex flex-col gap-y-1 border-b border-r border-neutral-300 p-2 py-10 text-center last-of-type:rounded-br-xl dark:border-neutral-600',
				!!onClick && 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700',
			)}>
			{children}
		</div>
	);
};

const MonthView = () => {
	const { hiddenCoursesIds } = useCalendarContext();
	const { firstCalendarDay, setViewMode, goToDay } = useSettings();
	const { data: notes } = useNotesWithTime();
	const firstDayOfMonth = startOfMonth(firstCalendarDay);
	const amountOfDaysInMonth = getDaysInMonth(firstCalendarDay);
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

	const goToDayInDaysView = (date: Date) => {
		goToDay(date);
		setViewMode('days');
	};

	return (
		<div className='my-4 grid grid-cols-7 overflow-hidden rounded-xl border-l border-t border-neutral-300 dark:border-neutral-600'>
			{/* Week day names */}
			{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(dayName => (
				<Tile key={dayName}>{dayName}</Tile>
			))}
			{/* Month days */}
			{renderedTiles.map(tile => {
				if (tile === null) {
					return <Tile key={Math.random()} />;
				}
				return (
					<Tile key={tile.toString()} onClick={() => goToDayInDaysView(tile)}>
						<p className='font-semibold'>{format(tile, 'd')}</p>
						{notes &&
							notes
								.filter(note => isSameDay(note.startTime, tile))
								.filter(note => !hiddenCoursesIds.includes(note.courseId))
								.map(note => <MonthViewNote key={note.id} note={note} />)}
					</Tile>
				);
			})}
		</div>
	);
};

export default MonthView;
