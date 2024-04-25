'use client';

import { getTasks } from '@/actions/get-tasks';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';

const SortTasks = ({}) => {
	const queryClient = useQueryClient();

	const onSortChange = (
		value: 'title' | 'createdAt' | 'dueDate' | 'priority' | 'completed',
	) => {
		if (!value) return;
		queryClient.fetchQuery({
			queryKey: ['tasks'],
			queryFn: async () => await getTasks({ orderBy: value }),
		});
	};

	return (
		<Select onValueChange={onSortChange}>
			<SelectTrigger className='sm:flex-1'>
				<SelectValue placeholder='Order by' />
			</SelectTrigger>
			<SelectContent className='md:flex-1'>
				<SelectItem value='title'>Alphabetically</SelectItem>
				<SelectItem value='dueDate'>By due date</SelectItem>
				<SelectItem value='priority'>By priority</SelectItem>
				<SelectItem value='createdAt'>Newest first</SelectItem>
				<SelectItem value='completed'>Completed first</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SortTasks;
