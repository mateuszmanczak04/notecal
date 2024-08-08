'use client';

import DropdownMenu from '@/components/common/dropdown-menu';
import { TaskPriority } from '@prisma/client';
import { FC } from 'react';
import useTasks from '../_hooks/use-tasks';

interface PriorityProps {
	id: string;
	priority: TaskPriority | null;
}

const getPriorityName = (priority: TaskPriority | null) => {
	if (priority === 'A') return 'High';
	if (priority === 'B') return 'Medium';
	if (priority === 'C') return 'Low';
	return 'No priority';
};

const Priority: FC<PriorityProps> = ({ id, priority }) => {
	const { update: updateTask } = useTasks();

	const options = [
		{
			value: 'C',
			label: getPriorityName('C'),
			className:
				'bg-green-200 text-green-600 hover:bg-green-300 dark:bg-green-800 dark:text-white dark:hover:bg-green-700',
		},
		{
			value: 'B',
			label: getPriorityName('B'),
			className:
				'bg-yellow-200 text-yellow-600 hover:bg-yellow-300 dark:bg-yellow-800 dark:text-white dark:hover:bg-yellow-700',
		},
		{
			value: 'A',
			label: getPriorityName('A'),
			className:
				'bg-red-200 text-red-600 hover:bg-red-300 dark:bg-red-800 dark:text-white dark:hover:bg-red-700',
		},
	];

	const currentOption = {
		value: priority,
		label: getPriorityName(priority),
	} || {
		value: null,
		label: getPriorityName(null),
	};

	const handleChange = (priority: any) => {
		updateTask({
			id,
			priority,
		});
	};

	return (
		<DropdownMenu
			height={6}
			className='w-52'
			currentOption={currentOption}
			options={options}
			onChange={handleChange}
		/>
	);
};

export default Priority;
