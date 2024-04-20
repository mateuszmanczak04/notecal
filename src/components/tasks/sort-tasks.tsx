'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import useTasksContext from '@/hooks/useTasksContext';

const SortTasks = ({}) => {
	const { orderByCompleted, orderByCreationDate, orderByTitle } =
		useTasksContext();

	const onSortChange = (value: string) => {
		switch (value) {
			case 'title':
				orderByTitle();
				break;
			case 'createdAt':
				orderByCreationDate();
				break;
			case 'completed':
				orderByCompleted();
				break;
			default:
				break;
		}
	};

	return (
		<Select onValueChange={onSortChange}>
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
