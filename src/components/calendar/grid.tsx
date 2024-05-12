'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import CalendarHours from '@/components/calendar/hours';

const LeftBorderRect = ({ last = false }: { last?: boolean }) => {
	if (last)
		return <div className='box-border h-16 w-4 border-y border-gray-300'></div>;
	return <div className='box-border h-16 w-4 border-t border-gray-300'></div>;
};

const GridRect = ({ last = false }: { last?: boolean }) => {
	if (last) return <div className='h-16 w-full border-y border-gray-300'></div>;
	return <div className='h-16 w-full border-t border-gray-300'></div>;
};

const CalendarGrid = () => {
	const { notes } = useCalendarContext();

	return (
		<div className='mt-2 flex'>
			<CalendarHours />
			{/* left border: */}
			<div className='ml-2 w-2 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<LeftBorderRect key={i} />
				))}
				<LeftBorderRect last />
			</div>
			{/* monday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
			{/* tuesday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
			{/* wednesday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
			{/* thursday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
			{/* friday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
			{/* saturday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
			{/* sunday */}
			<div className='flex-1 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<GridRect key={i} />
				))}
				<GridRect last />
			</div>
		</div>
	);
};

export default CalendarGrid;
