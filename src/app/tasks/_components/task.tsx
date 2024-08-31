'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import DatePicker from '@/components/common/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { type Task } from '@prisma/client';
import useTasks from '../_hooks/use-tasks';
import Course from './course';
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
	const course = useCourse(courseId);

	const handleToggleTask = (newValue: boolean) => {
		if (newValue === completed) return;

		updateTask({ id, completed: newValue });
	};

	const handleChangeDueDate = (newDueDate: Date | null) => {
		if (newDueDate === dueDate) return;

		updateTask({ id, dueDate });
	};

	const handleChangeCourse = (newCourseId: string | null) => {
		if (course && newCourseId === course.id) return;

		updateTask({ id, courseId: newCourseId });
	};

	return (
		<div className='flex gap-4 border-b border-neutral-200 pb-4 sm:p-4'>
			<Checkbox
				checked={completed}
				onCheckedChange={handleToggleTask}
				className='rounded-full'
				aria-label='task completed checkbox'
				title='task completed checkbox'
			/>
			<div className='min-w-0'>
				<Title id={id} title={title} completed={completed} />
				<Description
					id={id}
					description={description}
					completed={completed}
				/>
				{!completed && (
					<div className='mt-2 flex flex-wrap gap-2'>
						{/* Course */}
						<Course
							currentCourseId={courseId}
							onSelect={handleChangeCourse}
						/>

						{/* Due date */}
						<DatePicker
							date={dueDate}
							onSelect={handleChangeDueDate}
							className='h-9 w-56'
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
