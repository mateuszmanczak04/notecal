'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useTasks from '@/app/tasks/_hooks/use-tasks';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Task from './task';

const Tasks = () => {
	const { courseId } = useParams();
	const course = useCourse(courseId as string);
	const { tasks, isPending, error } = useTasks();

	const thisCourseTasks = tasks?.filter(task => task.courseId === courseId);

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{error && (
				<ErrorMessage className='my-2'>{error.message}</ErrorMessage>
			)}
			{isPending && (
				<div className='my-2 grid place-content-center'>
					<LoadingSpinner />
				</div>
			)}
			{thisCourseTasks?.map(task => <Task key={task.id} task={task} />)}
			<Button asChild style={{ background: course?.color }}>
				<Link prefetch href={`/tasks/create?courseId=${courseId}`}>
					<Plus className='h-4 w-4' /> Create a new task
				</Link>
			</Button>
		</div>
	);
};

export default Tasks;
