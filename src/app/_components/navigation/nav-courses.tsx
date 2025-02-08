'use client';

import { useCourses } from '@/hooks/use-courses';
import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type T_Props = {
	closeNavigation: () => void;
};

const NavCourses = ({ closeNavigation }: T_Props) => {
	const pathname = usePathname();
	const { data: courses } = useCourses();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div>
			<div
				className={cn(
					'mt-2 flex h-9 items-center gap-2 rounded-xl pr-3 font-semibold',
					(pathname.includes('/courses') || pathname.includes('/notes')) &&
						'overflow-clip bg-white dark:bg-neutral-700',
				)}>
				<button
					onClick={() => setIsOpen(prev => !prev)}
					className='ml-1 grid h-full w-6 place-content-center rounded-xl'>
					<ChevronRight className={cn('size-5 transition', isOpen && 'rotate-90')} />
				</button>
				<Link prefetch href='/courses' className='flex-1' onClick={closeNavigation}>
					Courses
				</Link>
			</div>
			<AnimatePresence>
				{isOpen && courses && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='ml-6 flex flex-col gap-2 rounded-xl p-2'>
						{courses.map(course => (
							<Link
								key={course.id}
								prefetch
								href={`/notes?courseId=${course.id}`}
								className='items-centertext-sm group flex'
								onClick={closeNavigation}>
								<div
									className='ml-1 size-4 rounded-full bg-neutral-200 dark:bg-neutral-700'
									style={{ backgroundColor: course.color }}></div>
								<p className='ml-2 truncate group-hover:underline'>{course.name}</p>
							</Link>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default NavCourses;
