'use client';

import { type Task } from '@prisma/client';
import { FC } from 'react';
import Course from './course';
import { EllipsisVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import DueDate from './due-date';
import Priority from './priority';
import { Checkbox } from '@/components/ui/checkbox';
import Menu from './menu';

interface TaskProps {
	task: Task;
}

const Task: FC<TaskProps> = ({
	task: { id, title, description, completed, courseId, dueDate, priority },
}) => {
	const color = 'blue-500'; // TODO: temporary solution

	return (
		<div className='flex gap-4 border-b border-gray-200 p-4'>
			<Checkbox className='' />
			<div className='flex flex-1 flex-col'>
				<p className={`font-bold text-[${color}]`}>{title}</p>
				<p className='mt-1 text-neutral-500'>{description}</p>
				<div className='mt-2 flex gap-2'>
					<Course id={id} courseId={courseId} />
					<DueDate id={id} dueDate={dueDate} />
					<Priority id={id} priority={priority} />
				</div>
			</div>
			<Menu taskId={id} />
		</div>
	);
};

export default Task;
