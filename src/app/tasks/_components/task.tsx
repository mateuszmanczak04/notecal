import { cn } from '@/utils/cn';
import { type Task } from '@prisma/client';
import { useEffect, useRef } from 'react';
import Completed from './completed';
import Course from './course';
import Description from './description';
import DueDate from './due-date';
import Priority from './priority';
import Title from './title';

type Props = {
	task: Task;
	/** Specify use case for this component. It can be user either big one in /tasks page or as a small task in /notes/[id] page. */
	forPage?: 'tasks' | 'notes';
	onMouseDown: (task: Task, e: React.MouseEvent<HTMLDivElement>) => void;
	top: number;
	index: number;
	setMovedTaskIndex: (index: number) => void;
	movedTask: Task | null;
};

const Task = ({ task, movedTask, index, setMovedTaskIndex, forPage = 'tasks', onMouseDown, top }: Props) => {
	const topRef = useRef<HTMLDivElement>(null!);
	const bottomRef = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!movedTask) return;
			const topRect = topRef.current.getBoundingClientRect();
			const bottomRect = bottomRef.current.getBoundingClientRect();

			if (e.clientY > topRect.top && e.clientY < topRect.bottom) {
				setMovedTaskIndex(index);
			} else if (e.clientY > bottomRect.top && e.clientY < bottomRect.bottom) {
				setMovedTaskIndex(index + 1);
			}
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [index, movedTask, setMovedTaskIndex, task.title]);

	return (
		<>
			{/* Original to stay in place until update */}
			<div
				className={cn(
					'relative flex w-full select-none gap-4 border-b border-neutral-700 p-4',
					forPage === 'notes' && 'gap-2 p-2',
					movedTask?.id === task.id && 'opacity-50',
				)}
				onMouseDown={e => onMouseDown(task, e)}>
				<Completed task={task} forPage={forPage} />
				<div className='flex min-w-0 flex-1 flex-col '>
					<Title task={task} forPage={forPage} />
					<Description task={task} forPage={forPage} />

					<div
						className={cn(
							forPage === 'tasks' && 'flex flex-wrap gap-4',
							forPage === 'notes' && 'flex flex-col gap-y-2 ',
						)}>
						<Course task={task} forPage={forPage} />
						<DueDate task={task} forPage={forPage} />
						<Priority task={task} forPage={forPage} />
					</div>
				</div>
				<div ref={topRef} className='pointer-events-none absolute left-0 top-0 h-1/2 w-full' />
				<div ref={bottomRef} className='pointer-events-none absolute left-0 top-1/2 h-1/2 w-full' />
			</div>

			{/* Copy */}
			{!!top && (
				<div
					className={cn(
						'absolute z-10 flex w-full cursor-move select-none gap-4 bg-white p-4 opacity-50 shadow-xl dark:bg-neutral-800 ',
						forPage === 'notes' && 'gap-2 p-2',
					)}
					style={{ top }}
					onMouseDown={e => onMouseDown(task, e)}>
					<Completed task={task} forPage={forPage} />
					<div className='flex min-w-0 flex-1 flex-col '>
						<Title task={task} forPage={forPage} />
						<Description task={task} forPage={forPage} />

						<div
							className={cn(
								forPage === 'tasks' && 'flex flex-wrap gap-4',
								forPage === 'notes' && 'flex flex-col gap-y-2 ',
							)}>
							<Course task={task} forPage={forPage} />
							<DueDate task={task} forPage={forPage} />
							<Priority task={task} forPage={forPage} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Task;
