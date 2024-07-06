'use client';

import StartTime from './start-time';
import EndTime from './end-time';

const Time = () => {
	return (
		<div className='flex items-center gap-2'>
			<StartTime />
			<EndTime />
		</div>
	);
};

export default Time;
