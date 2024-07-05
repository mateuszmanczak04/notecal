'use client';

const HourRect = ({
	hour,
	bottomHour,
}: {
	hour: string;
	bottomHour?: string;
}) => {
	return (
		<div className='relative h-16 w-full'>
			<p className='absolute -top-3'>{hour}</p>
			{bottomHour && <p className='absolute -bottom-2'>{bottomHour}</p>}
		</div>
	);
};

const CalendarHours = () => {
	return (
		<div className='w-12'>
			<HourRect hour='00:00' />
			<HourRect hour='01:00' />
			<HourRect hour='02:00' />
			<HourRect hour='03:00' />
			<HourRect hour='04:00' />
			<HourRect hour='05:00' />
			<HourRect hour='06:00' />
			<HourRect hour='07:00' />
			<HourRect hour='08:00' />
			<HourRect hour='09:00' />
			<HourRect hour='10:00' />
			<HourRect hour='11:00' />
			<HourRect hour='12:00' />
			<HourRect hour='13:00' />
			<HourRect hour='14:00' />
			<HourRect hour='15:00' />
			<HourRect hour='16:00' />
			<HourRect hour='17:00' />
			<HourRect hour='18:00' />
			<HourRect hour='19:00' />
			<HourRect hour='20:00' />
			<HourRect hour='21:00' />
			<HourRect hour='22:00' />
			<HourRect hour='23:00' bottomHour='00:00' />
		</div>
	);
};

export default CalendarHours;
