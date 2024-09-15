'use client';

import { Button } from '@/components/ui/button';
import { Course } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Task from './task';

type Props = {
	tasks: Task[];
	course: Course;
};

const Tasks = ({ tasks, course }: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>

			{tasks?.map(task => <Task key={task.id} task={task} />)}
			<Button asChild style={{ background: course?.color }}>
				<Link prefetch href={`/tasks/create?courseId=${course.id}`}>
					<Plus className='h-4 w-4' /> Create a new task
				</Link>
			</Button>
		</div>
	);
};

export default Tasks;
