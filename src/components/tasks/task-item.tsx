'use client';

import completeTask from '@/actions/complete-task';
import { deleteTask } from '@/actions/delete-task';
import { updateTaskDueDate } from '@/actions/update-task-due-date';
import TaskCourse from '@/components/tasks/task-course';
import TaskDescription from '@/components/tasks/task-description';
import TaskDueDate from '@/components/tasks/task-due-date';
import TaskPriority from '@/components/tasks/task-priority';
import TaskTitle from '@/components/tasks/task-title';
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
import useSettings from '@/hooks/use-settings';
import sortTasks from '@/lib/sort-tasks';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical, Trash } from 'lucide-react';
import { FC, useOptimistic, useState, useTransition } from 'react';

interface TaskItemProps {
	task: Task;
}

const TaskItem: FC<TaskItemProps> = ({
	task: { title, description, courseId, priority, dueDate, completed, id },
}) => {
	const [isPending, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const onToggle = () => {
		startTransition(() => {
			completeTask({ id, newValue: !completed });
			queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
				const oldTasks = old.tasks;
				return {
					tasks: oldTasks.map(task => {
						if (task.id === id) {
							return { ...task, completed: !task.completed };
						}
						return task;
					}),
				};
			});
		});
	};

	const onDelete = () => {
		startTransition(() => {
			deleteTask({ id });
			queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
				const oldTasks = old.tasks;
				return {
					tasks: oldTasks.filter(task => task.id !== id),
				};
			});
		});
	};

	const onResetDueDate = () => {
		startTransition(async () => {
			updateTaskDueDate({ id, newDueDate: null });
			queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
				const oldTasks = old.tasks;
				return {
					tasks: oldTasks.map(task => {
						if (task.id === id) {
							return { ...task, dueDate: null };
						}
						return task;
					}),
				};
			});
		});
	};

	return (
		<Card className={'shadow-none'}>
			<div className='flex items-start'>
				<div className='py-6 pl-6'>
					<Checkbox
						onClick={onToggle}
						checked={completed}
						className='h-8 w-8 shadow-none'
					/>
				</div>
				<CardHeader className='flex-1 space-y-0 overflow-x-hidden'>
					<TaskTitle id={id} title={title} />
					<TaskDescription id={id} description={description || ''} />
					<div className='flex flex-wrap items-center gap-1 pt-2'>
						<TaskCourse courseId={courseId} id={id} />
						<TaskPriority id={id} priority={priority} />
						<TaskDueDate id={id} dueDate={dueDate} />
					</div>
				</CardHeader>
				<div className='py-6 pr-6'>
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
									<Trash className='h-4 w-4' /> Delete
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									onClick={onResetDueDate}
									className='flex w-full items-center gap-1'
									variant='secondary'>
									<Trash className='h-4 w-4' /> Reset due date
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</Card>
	);
};

export default TaskItem;
