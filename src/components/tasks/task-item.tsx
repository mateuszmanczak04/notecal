'use client';

import completeTask from '@/actions/complete-task';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { type Task } from '@/types';
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

	return (
		<Card
			className={cn(
				'shadow-none',
				isPending && 'pointer-events-none opacity-75',
			)}>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<p>{title}</p>
					<Checkbox
						onClick={onToggle}
						checked={optimisticCompleted}
						className='h-5 w-5 shadow-none'
					/>
				</CardTitle>
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
		</Card>
	);
};

export default TaskItem;
