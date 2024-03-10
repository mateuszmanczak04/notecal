const WeekDayName = ({ day, date }: { day: string; date: string }) => {
	return (
		<div className='flex-1'>
			<p className='text-lg font-semibold'>{day}</p>
			<p className='text-gray-500 text-sm'>{date}</p>
		</div>
	);
};

const HourRect = ({
	hour,
	bottomHour,
}: {
	hour: string;
	bottomHour?: string;
}) => {
	return (
		<div className='h-16 w-full relative'>
			<p className='absolute -top-3'>{hour}</p>
			{bottomHour && <p className='absolute -bottom-2'>{bottomHour}</p>}
		</div>
	);
};

const LeftBorderRect = ({ last = false }: { last?: boolean }) => {
	if (last)
		return <div className='w-4 h-16 box-border border-y border-gray-300'></div>;
	return <div className='w-4 h-16 box-border border-t border-gray-300'></div>;
};

const GridRect = ({ last = false }: { last?: boolean }) => {
	if (last) return <div className='w-full h-16 border-y border-gray-300'></div>;
	return <div className='w-full h-16 border-t border-gray-300'></div>;
};

const page = () => {
	return (
		<div className='w-full min-w-[800px] p-4'>
			{/* top bar: */}
			<div className='flex flex-col justify-between w-full'>
				{/* +, <, > */}
				<div className='w-64 gap-2 flex justify-between'>
					<button className='bg-pink-700 text-white flex-1 h-8 rounded-md text-2xl font-semibold'>
						+
					</button>
					<button className='bg-gray-200 flex-1 h-8 rounded-md text-xl font-semibold'>
						L
					</button>
					<button className='bg-gray-200 flex-1 h-8 rounded-md text-xl font-semibold'>
						R
					</button>
				</div>
				{/* week day names */}
				<div className='flex flex-1 justify-between mt-2'>
					<div className='w-16'></div>
					<WeekDayName day='Mon' date='12.03.2024' />
					<WeekDayName day='Tue' date='13.03.2024' />
					<WeekDayName day='Wed' date='14.03.2024' />
					<WeekDayName day='Thu' date='15.03.2024' />
					<WeekDayName day='Fri' date='16.03.2024' />
					<WeekDayName day='Sat' date='17.03.2024' />
					<WeekDayName day='Sun' date='18.03.2024' />
				</div>
			</div>
			{/* grid: */}
			<div className='mt-2 flex'>
				{/* hours: */}
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
				{/* left border: */}
				<div className='w-2 ml-2 border-r border-gray-300'>
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
		</div>
	);
};

export default page;
