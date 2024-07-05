'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { updateTaskDueDate as updateTaskDueDateLocal } from '@/lib/update-task';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC, useTransition } from 'react';
import Tag from './tag';

interface TaskTitleProps {
	id: string;
	dueDate: Date | null;
}

const DueDate: FC<TaskTitleProps> = ({ id, dueDate }) => {
	// const [isPending, startTransition] = useTransition();
	// const onChange = (date: any) => {
	// 	if (date) {
	// 		startTransition(() => {
	// 			updateTask({ id, dueDate: date });
	// 			updateTaskDueDateLocal(id, date);
	// 		});
	// 	}
	// };

	if (!dueDate) return;

	return <Tag text={format(dueDate, 'yyyy-MM-dd')} />;
};

export default DueDate;
