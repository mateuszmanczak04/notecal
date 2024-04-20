'use client';

import { Toggle } from '@/components/ui/toggle';
import { FC } from 'react';

interface TasksViewModeProps {
	setViewMode: (newValue: 'default' | 'compact') => void;
	viewMode: 'default' | 'compact';
}

const TasksViewMode: FC<TasksViewModeProps> = ({ setViewMode, viewMode }) => {
	const onChange = (compact: boolean) => {
		if (compact) {
			setViewMode('compact');
		} else {
			setViewMode('default');
		}
	};

	return (
		<Toggle
			className='w-full sm:w-fit'
			onPressedChange={onChange}
			value={viewMode}>
			Compact Mode
		</Toggle>
	);
};

export default TasksViewMode;
