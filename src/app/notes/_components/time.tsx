'use client';

import StartTime from './start-time';
import EndTime from './end-time';

const Time = () => {
	return (
		<div className='mt-2 flex items-center gap-2'>
			<StartTime />
			<EndTime />
		</div>
	);
};

export default Time;
