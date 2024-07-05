'use client';

import deleteTask from '@/actions/tasks/delete-task';
import updateTask from '@/actions/tasks/update-task';
import TaskCourse from '@/app/tasks/_components/task-course';
import TaskDescription from '@/app/tasks/_components/task-description';
import TaskDueDate from '@/app/tasks/_components/task-due-date';
import TaskPriority from '@/app/tasks/_components/task-priority';
import TaskTitle from '@/app/tasks/_components/task-title';
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
import {
	deleteTask as deleteTaskLocal,
	toggleTask,
	updateTaskDueDate as updateTaskDueDateLocal,
} from '@/lib/update-task';
import { Task } from '@prisma/client';
import { EllipsisVertical, Trash } from 'lucide-react';
import { FC, useTransition } from 'react';

interface TaskItemProps {
	task: Task;
}

const TaskItem: FC<TaskItemProps> = ({
	task: { title, description, courseId, priority, dueDate, completed, id },
}) => {
	const [isPending, startTransition] = useTransition();

	const onToggle = () => {
		startTransition(() => {
			updateTask({ id, completed: !completed });
			toggleTask(id);
		});
	};

	const onDelete = () => {
		startTransition(() => {
			deleteTask({ id });
			deleteTaskLocal(id);
		});
	};

	const onResetDueDate = () => {
		startTransition(() => {
			updateTask({ id, dueDate: null });
			updateTaskDueDateLocal(id, null);
		});
	};

	return (
		<Card className='border-none bg-primary/5 shadow-none dark:bg-white/5'>
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
