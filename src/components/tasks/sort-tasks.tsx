'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FC } from 'react';

interface SortTasksProps {
	onChange: (value: string) => void;
}

const SortTasks: FC<SortTasksProps> = ({ onChange }) => {
	return (
		<Select onValueChange={onChange}>
			<SelectTrigger className='sm:flex-1'>
				<SelectValue placeholder='Order by' />
			</SelectTrigger>
			<SelectContent className='md:flex-1'>
				<SelectItem value='title'>Alphabetically</SelectItem>
				<SelectItem value='createdAt'>Newest first</SelectItem>
				<SelectItem value='completed'>Completed first</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SortTasks;
