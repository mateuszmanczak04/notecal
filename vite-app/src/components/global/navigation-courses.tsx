import { GraduationCap } from 'lucide-react';
import { NavLink, useSearchParams } from 'react-router';
import { useCourses } from '../../hooks/use-courses';
import { cn } from '../../utils/cn';

type T_Props = {
	closeNavigation: () => void;
};

const NavigationCourses = ({ closeNavigation }: T_Props) => {
	const [searchParams] = useSearchParams();
	const { data: courses } = useCourses();

	return (
		<div>
			<NavLink
				to='/courses'
				className={({ isActive }) =>
					cn(
						'mt-2 flex h-9 items-center gap-2 rounded-xl px-3 font-semibold',
						isActive && 'bg-white dark:bg-neutral-800',
					)
				}
				onClick={closeNavigation}>
				<GraduationCap className='size-5' />
				Courses
			</NavLink>

			{courses && (
				<div className='ml-6 flex flex-col rounded-xl'>
					{courses.map(course => (
						<NavLink
							key={course.id}
							to={`/notes?courseId=${course.id}`}
							className={cn(
								'group flex items-center rounded-md px-2 py-1 text-sm',
								searchParams.get('courseId') == course.id && 'bg-white dark:bg-neutral-800',
							)}
							onClick={closeNavigation}>
							<div
								className='ml-1 size-4 rounded-full bg-neutral-200 dark:bg-neutral-700'
								style={{ backgroundColor: course.color }}></div>
							<p className='ml-2 truncate group-hover:underline'>{course.name}</p>
						</NavLink>
					))}
				</div>
			)}
		</div>
	);
};

export default NavigationCourses;
