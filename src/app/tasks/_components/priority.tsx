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

const getPriorityClassName = (priority: TaskPriority | null) => {
	if (priority === 'A')
		return 'bg-red-500 text-black hover:bg-red-400 dark:bg-red-500 dark:text-black dark:hover:bg-red-400 dark:border-transparent';
	if (priority === 'B')
		return 'bg-yellow-400 text-black hover:bg-yellow-300 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 dark:border-transparent';
	if (priority === 'C')
		return 'bg-green-500 text-black hover:bg-green-400 dark:bg-green-500 dark:text-black dark:hover:bg-green-400 dark:border-transparent';
	return '';
};

const Priority: FC<PriorityProps> = ({ id, priority }) => {
	const { update: updateTask } = useTasks();

	const options = [
		{
			value: 'C',
			label: getPriorityName('C'),
			className: getPriorityClassName('C'),
		},
		{
			value: 'B',
			label: getPriorityName('B'),
			className: getPriorityClassName('B'),
		},
		{
			value: 'A',
			label: getPriorityName('A'),
			className: getPriorityClassName('A'),
		},
	];

	const currentOption = {
		value: priority,
		label: getPriorityName(priority),
		className: getPriorityClassName(priority),
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
			showNullOption
			height={9}
			className='w-52'
			currentOption={currentOption}
			options={options}
			onChange={handleChange}
		/>
	);
};

export default Priority;
