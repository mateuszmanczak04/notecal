'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateTaskPriority as updateTaskPriorityLocal } from '@/lib/update-task';
import { cn } from '@/lib/utils';
import { TaskPriority as TaskPriorityEnum } from '@prisma/client';
import { FC, useTransition } from 'react';
import Tag from './tag';

interface Props {
	id: string;
	priority: TaskPriorityEnum | null;
}

// const NO_TASK_PRIORITY = 'none';

const getPriorityName = (priority: TaskPriorityEnum | null) => {
	if (priority === 'A') return 'High';
	if (priority === 'B') return 'Medium';
	if (priority === 'C') return 'Low';
	return 'No priority';
};

const Priority: FC<Props> = ({ id, priority }) => {
	// const [isPending, startTransition] = useTransition();
	// const onChange = (newPriority: string) => {
	// 	if (
	// 		newPriority !== 'A' &&
	// 		newPriority !== 'B' &&
	// 		newPriority !== 'C' &&
	// 		newPriority !== NO_TASK_PRIORITY
	// 	) {
	// 		return;
	// 	}
	// 	startTransition(() => {
	// 		updateTask({
	// 			id,
	// 			priority: newPriority === NO_TASK_PRIORITY ? null : newPriority,
	// 		});
	// 		updateTaskPriorityLocal(
	// 			id,
	// 			newPriority === NO_TASK_PRIORITY ? null : newPriority,
	// 		);
	// 	});
	// };

	return (
		<Tag
			text={getPriorityName(priority)}
			className={cn(
				priority === 'A' && 'bg-red-100 text-red-500',
				priority === 'B' && 'bg-yellow-100 text-yellow-500',
				priority === 'C' && 'bg-green-100 text-green-500',
			)}
		/>
	);
};

export default Priority;
