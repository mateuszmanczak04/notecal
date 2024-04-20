'use client';

import completeTask from '@/actions/complete-task';
import { deleteTask } from '@/actions/delete-task';
import TaskCourse from '@/components/tasks/task-course';
import TaskDescription from '@/components/tasks/task-description';
import TaskDueDate from '@/components/tasks/task-due-date';
import TaskTitle from '@/components/tasks/task-title';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { type Task } from '@/types';
import { Course } from '@prisma/client';
import { EllipsisVertical, Trash } from 'lucide-react';
import { FC, useOptimistic, useState, useTransition } from 'react';
import TaskPriority from './task-priority';

interface TaskItemCompactProps {
	task: Task;
	courses: Course[];
}

const TaskItemCompact: FC<TaskItemCompactProps> = ({
	task: {
		title,
		description,
		courseName,
		courseId,
		priority,
		dueDate,
		completed: done,
		id,
	},
	courses,
}) => {
	const [completed, setCompleted] = useState<boolean>(done);
	const [optimisticCompleted, setOptimisticCompleted] =
		useOptimistic<boolean>(completed);
	const [isPending, startTransition] = useTransition();

	const onToggle = () => {
		startTransition(async () => {
			setOptimisticCompleted(prev => !prev);
			const res = await completeTask({ id, newValue: !completed });
			if (typeof res.completed === 'boolean') {
				setCompleted(res.completed);
			}
		});
	};

	const onDelete = () => {
		startTransition(async () => {
			deleteTask({ id });
		});
	};

	return (
		<Card
			className={cn(
				'shadow-none',
				isPending && 'pointer-events-none opacity-75',
			)}>
			<div className='flex items-start'>
				<div className='py-2 pl-2'>
					<Checkbox
						onClick={onToggle}
						checked={optimisticCompleted}
						className='h-6 w-6 shadow-none'
					/>
				</div>
				<CardHeader className='flex-1 space-y-0 overflow-x-hidden pb-2 pl-2 pt-2'>
					<TaskTitle id={id} title={title} />
					<div className='h-4 -translate-y-2 '>
						<TaskDescription id={id} description={description || ''} />
					</div>
					<div className='flex items-center gap-1 pt-0'>
						<TaskCourse
							courseName={courseName}
							courseId={courseId}
							id={id}
							courses={courses}
						/>
						<TaskPriority id={id} priority={priority || undefined} />
						<TaskDueDate id={id} dueDate={dueDate || undefined} />
					</div>
				</CardHeader>
				<div className='py-2 pr-2'>
					{/* menu */}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisVertical />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Options</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button
									onClick={onDelete}
									className='flex w-full items-center gap-1'
									variant='destructive'>
									<Trash className='h-3 w-3' /> Delete
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</Card>
	);
};

export default TaskItemCompact;
