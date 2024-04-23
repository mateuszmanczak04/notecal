'use client';

import { Toggle } from '@/components/ui/toggle';

const TasksViewMode = () => {
	const onChange = (compact: boolean) => {};

	return (
		<Toggle
			className='w-full sm:w-fit'
			onPressedChange={onChange}
			value={'default'}>
			Compact Mode
		</Toggle>
	);
};

export default TasksViewMode;
