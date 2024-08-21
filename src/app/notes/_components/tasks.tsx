'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Task from './task';

const Tasks = () => {
	const { tasks, course } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{tasks &&
				tasks.length > 0 &&
				tasks.map(task => <Task key={task.id} task={task} />)}
			<Button
				asChild
				style={{ background: course?.color }}
				className='gap-1'>
				<Link href={`/tasks/create?courseId=${course.id}`}>
					<Plus /> Create a new task
				</Link>
			</Button>
		</div>
	);
};

export default Tasks;
