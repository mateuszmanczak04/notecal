'use client';

import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { useTasks } from '@/hooks/use-tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import updateTask from '../_actions/update-task';
import Task from './task';

/**
 * List of all user's tasks.
 */
const Tasks = () => {
	const { data: tasks, error, isPending } = useTasks();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate } = useMutation({
		mutationFn: updateTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	const containerRef = useRef<HTMLDivElement>(null!);
	const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
	const [droppedTaskId, setDroppedTaskId] = useState<string | null>(null);

	const handleDragStart = (task: Task, e: React.DragEvent) => {
		setDraggedTaskId(task.id);
	};

	const handleDragEnter = (task: Task, e: React.DragEvent) => {
		if (!draggedTaskId) return;
		setDroppedTaskId(task.id);
	};

	// Necessary for handleDrop to work
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (task: Task, e: React.DragEvent) => {
		if (!draggedTaskId || !droppedTaskId) return;

		const droppedTaskIndex = tasks.findIndex(task => task.id === droppedTaskId);
		const droppedTask = tasks[droppedTaskIndex];
		const taskAfterDroppedTask = tasks[droppedTaskIndex + 1];
		if (!taskAfterDroppedTask) {
			mutate({ id: draggedTaskId, weight: droppedTask.weight + 10000 });
		} else {
			mutate({ id: draggedTaskId, weight: (droppedTask.weight + taskAfterDroppedTask.weight) / 2 });
		}

		setDraggedTaskId(null);
		setDroppedTaskId(null);
	};

	return (
		<div className='space-y-4' ref={containerRef}>
			{tasks.map(task => (
				<Task
					isBeingDropped={task.id === droppedTaskId}
					key={task.id}
					task={task}
					onDragEnter={handleDragEnter}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				/>
			))}
		</div>
	);
};

export default Tasks;
