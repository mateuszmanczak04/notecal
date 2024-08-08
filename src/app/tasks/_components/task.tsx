'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import DatePicker from '@/components/common/date-picker';
import DropdownMenu from '@/components/common/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { type Task } from '@prisma/client';
import useTasks from '../_hooks/use-tasks';
import Description from './description';
import Priority from './priority';
import Title from './title';

type Props = {
	task: Task;
};

const Task = ({
	task: { id, title, description, completed, courseId, dueDate, priority },
}: Props) => {
	const { update: updateTask } = useTasks();
	const { courses } = useCourses();
	const course = useCourse(courseId);

	const handleToggleTask = (newValue: boolean) => {
		updateTask({ id, completed: newValue });
	};

	const handleChangeDueDate = (dueDate: Date | null) => {
		updateTask({ id, dueDate });
	};

	const currentCourse = course
		? { value: course.id, label: course.name }
		: { value: null, label: 'No course' };

	const coursesOptions =
		courses?.map(course => ({
			value: course.id,
			label: course.name,
		})) || [];

	const handleChangeCourse = (newCourseId: string) => {
		// We don't want to update the identical value
		if (course && newCourseId === course.id) return;

		updateTask({ id, courseId: newCourseId });
	};

	return (
		<div className='flex gap-4 border-b border-neutral-200 pb-4 sm:p-4'>
			<Checkbox
				checked={completed}
				onCheckedChange={handleToggleTask}
				className='h-6 w-6 rounded-full'
			/>
			<div className='min-w-0'>
				<Title id={id} title={title} completed={completed} />
				<Description id={id} description={description} completed={completed} />
				{!completed && (
					<div className='mt-2 flex flex-wrap gap-2'>
						{/* Course */}
						<DropdownMenu
							currentOption={currentCourse}
							options={coursesOptions}
							onChange={handleChangeCourse}
							height={6}
							className='w-52'
						/>

						{/* Due date */}
						<DatePicker
							date={dueDate}
							onSelect={handleChangeDueDate}
							className='h-6 w-56'
						/>

						{/* Priority */}
						<Priority id={id} priority={priority} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;
