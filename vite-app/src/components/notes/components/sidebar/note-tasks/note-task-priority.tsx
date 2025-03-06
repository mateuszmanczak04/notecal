import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { T_Task } from '../../../../../types';
import { cn } from '../../../../../utils/cn';
import { useTaskPriority } from '../../../../tasks/hooks/use-task-priority';

type T_Props = {
	task: T_Task;
};

const NoteTaskPriority = ({ task }: T_Props) => {
	const { updateTaskPriority, isPending } = useTaskPriority(task);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null!);
	useOnClickOutside(ref, () => setIsOpen(false));

	return (
		<div ref={ref} className={cn('relative transition-opacity', isPending && 'pointer-events-none opacity-50')}>
			<button
				className='size-6 rounded-md border border-neutral-200 p-1 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
				onClick={() => setIsOpen(prev => !prev)}>
				<div
					className={cn(
						'aspect-square size-full rounded-full',
						task.priority === null && 'bg-neutral-200 dark:bg-neutral-700',
						task.priority === 'A' && 'bg-red-500 dark:bg-red-400',
						task.priority === 'B' && 'bg-yellow-500 dark:bg-yellow-400',
						task.priority === 'C' && 'bg-green-500 dark:bg-green-400',
					)}></div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='absolute left-0 top-7 z-10 flex gap-x-1 rounded-md bg-white p-2 shadow-xl dark:bg-neutral-800'>
						{[null, 'A', 'B', 'C'].map(priority => (
							<button
								key={priority}
								onClick={() => {
									setIsOpen(false);
									updateTaskPriority(priority);
								}}
								className='rounded-md border border-neutral-200 p-1 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700'>
								<div
									className={cn(
										'aspect-square size-3 rounded-full',
										priority === null && 'bg-neutral-200 dark:bg-neutral-700',
										priority === 'A' && 'bg-red-500 dark:bg-red-400',
										priority === 'B' && 'bg-yellow-500 dark:bg-yellow-400',
										priority === 'C' && 'bg-green-500 dark:bg-green-400',
									)}></div>
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default NoteTaskPriority;
