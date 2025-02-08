'use client';

import { useTaskCourse } from '@/app/tasks/_hooks/use-task-course';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type T_Props = {
	task: Task;
};

const NoteTaskCourse = ({ task }: T_Props) => {
	const { currentTaskCourse, isPending, updateTaskCourse, courses } = useTaskCourse(task);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null!);
	useOnClickOutside(ref, () => setIsOpen(false));

	if (!currentTaskCourse) return;

	return (
		<div ref={ref} className={cn('relative transition-opacity', isPending && 'pointer-events-none opacity-50')}>
			<button
				className='size-6 rounded-md border border-neutral-200 p-1 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800'
				onClick={() => setIsOpen(prev => !prev)}>
				<div
					className='aspect-square size-full rounded-full bg-neutral-200 dark:bg-neutral-700'
					style={{ backgroundColor: currentTaskCourse.color }}></div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='absolute left-0 top-7 z-10 flex flex-col gap-y-2 rounded-md bg-white p-2 shadow-xl dark:bg-neutral-800'>
						{courses &&
							courses.map(course => (
								<button
									key={course.id}
									onClick={() => {
										setIsOpen(false);
										updateTaskCourse(course.id);
									}}
									className='flex items-center gap-2 text-nowrap rounded-md border border-neutral-200 px-2 py-1 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700'>
									<div
										className='aspect-square size-3 rounded-full   bg-neutral-200  dark:bg-neutral-600'
										style={{ backgroundColor: course.color }}></div>
									<p className='w-32 truncate text-start text-sm'> {course.name}</p>
								</button>
							))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default NoteTaskCourse;
