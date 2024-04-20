'use client';

import completeTask from '@/actions/complete-task';
import { deleteTask } from '@/actions/delete-task';
import TaskTitle from '@/components/tasks/task-title';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
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
import { EllipsisVertical, Trash } from 'lucide-react';
import { useOptimistic, useState, useTransition } from 'react';

const TaskItem = ({
	title,
	description,
	courseName,
	priority,
	dueDate,
	completed: done,
	id,
}: Task) => {
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
			deleteTask({ id }).then(res => {
				console.log(res);
			});
		});
	};

	return (
		<Card
			className={cn(
				'shadow-none',
				isPending && 'pointer-events-none opacity-75',
			)}>
			<div className='flex items-start'>
				<div className='py-6 pl-6'>
					<Checkbox
						onClick={onToggle}
						checked={optimisticCompleted}
						className='h-8 w-8 shadow-none'
					/>
				</div>
				<CardHeader className='flex-1 overflow-x-hidden'>
					<TaskTitle id={id} title={title} />
					{description && <CardDescription>{description}</CardDescription>}
					<div className='flex items-center gap-1'>
						{courseName && (
							<Badge className='pointer-events-none bg-purple-600 shadow-none'>
								{courseName}
							</Badge>
						)}
						{priority && (
							<Badge
								className={cn(
									'pointer-events-none shadow-none',
									priority === 'high' && 'bg-red-500',
									priority === 'medium' && 'bg-amber-500',
									priority === 'low' && 'bg-green-500',
								)}>
								{priority}
							</Badge>
						)}
						{dueDate && (
							<Badge className='pointer-events-none bg-neutral-200 text-neutral-800 shadow-none'>
								{dueDate?.toLocaleDateString('en-US')}
							</Badge>
						)}
					</div>
				</CardHeader>
				<div className='py-6 pr-6'>
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
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</Card>
	);
};

export default TaskItem;
