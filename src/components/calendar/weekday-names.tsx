'use client';

const WeekDayName = ({ day, date }: { day: string; date: string }) => {
	return (
		<div className='flex-1'>
			<p className='text-lg font-semibold'>{day}</p>
			<p className='text-sm text-gray-500'>{date}</p>
		</div>
	);
};

const CalendarWeekdayNames = () => {
	return (
		<div className='mt-2 flex flex-1 justify-between'>
			<div className='w-16'></div>
			<WeekDayName day='Mon' date='12.03.2024' />
			<WeekDayName day='Tue' date='13.03.2024' />
			<WeekDayName day='Wed' date='14.03.2024' />
			<WeekDayName day='Thu' date='15.03.2024' />
			<WeekDayName day='Fri' date='16.03.2024' />
			<WeekDayName day='Sat' date='17.03.2024' />
			<WeekDayName day='Sun' date='18.03.2024' />
		</div>
	);
};

export default CalendarWeekdayNames;
