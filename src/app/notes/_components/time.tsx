'use client';

import EndTime from './end-time';
import StartTime from './start-time';

const Time = () => {
	return (
		<div className='mt-2 flex items-center gap-2'>
			<StartTime />
			<EndTime />
		</div>
	);
};

export default Time;
