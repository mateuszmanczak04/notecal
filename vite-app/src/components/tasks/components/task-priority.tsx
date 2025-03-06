import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { T_Task } from '../../../types';
import { cn } from '../../../utils/cn';
import { useTaskPriority } from '../hooks/use-task-priority';

type T_Props = {
	task: T_Task;
};

const TaskPriority = ({ task }: T_Props) => {
	const { updateTaskPriority, isPending } = useTaskPriority(task);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null!);
	useOnClickOutside(ref, () => setIsOpen(false));

	return (
		<div ref={ref} className={cn('relative transition-opacity', isPending && 'pointer-events-none opacity-50')}>
			<button
				className='flex h-6 items-center gap-1 rounded-md border border-neutral-200 p-1 px-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
				onClick={() => setIsOpen(prev => !prev)}>
				<div
					className={cn(
						'aspect-square size-full rounded-full',
						task.priority === null && 'bg-neutral-200 dark:bg-neutral-700',
						task.priority === 'A' && 'bg-red-500 dark:bg-red-400',
						task.priority === 'B' && 'bg-yellow-500 dark:bg-yellow-400',
						task.priority === 'C' && 'bg-green-500 dark:bg-green-400',
					)}></div>
				<p>
					{(() => {
						switch (task.priority) {
							case 'A':
								return 'High';
							case 'B':
								return 'Medium';
							case 'C':
								return 'Low';
							default:
								return 'None';
						}
					})()}
				</p>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='absolute left-0 top-7 z-10 flex flex-col rounded-md bg-white p-2 shadow-xl dark:bg-neutral-800'>
						{['A', 'B', 'C', null].map(priority => (
							<button
								key={priority}
								onClick={() => {
									setIsOpen(false);
									updateTaskPriority(priority);
								}}
								className='flex items-center gap-2 text-nowrap border border-b-0 border-neutral-200 px-2 py-1 text-sm transition-colors first-of-type:rounded-t-md last-of-type:rounded-b-md last-of-type:border-b hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700'>
								<div
									className={cn(
										'aspect-square size-3 rounded-full',
										priority === null && 'bg-neutral-200 dark:bg-neutral-700',
										priority === 'A' && 'bg-red-500 dark:bg-red-400',
										priority === 'B' && 'bg-yellow-500 dark:bg-yellow-400',
										priority === 'C' && 'bg-green-500 dark:bg-green-400',
									)}></div>
								<p className='max-w-32 truncate text-start'>
									{(() => {
										switch (priority) {
											case 'A':
												return 'High';
											case 'B':
												return 'Medium';
											case 'C':
												return 'Low';
											default:
												return 'None';
										}
									})()}
								</p>
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TaskPriority;
