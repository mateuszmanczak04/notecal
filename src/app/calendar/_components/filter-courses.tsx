'use client';

import { Checkbox } from '@/components/checkbox';
import { useCourses } from '@/hooks/use-courses';

type Props = {};

const FilterCourses = ({}: Props) => {
	const { data: courses } = useCourses();

	if (!courses) return;

	return (
		<div className='mt-4 flex w-full items-center justify-between gap-8 overflow-x-auto rounded-md border border-neutral-200 p-4 dark:border-neutral-600'>
			<p className='text-nowrap font-semibold'>Filter courses:</p>
			<div className='flex items-center gap-4'>
				{courses.map(course => (
					<div key={course.id} className='flex items-center gap-1'>
						<Checkbox id={course.id + '-filter'} className='size-5' />
						<label htmlFor={course.id + '-filter'} className='cursor-pointer'>
							{course.name}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilterCourses;
