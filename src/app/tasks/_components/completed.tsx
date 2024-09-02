'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@prisma/client';
import useTasks from '../_hooks/use-tasks';
import useTasksHistory from '../_hooks/use-tasks-history';

type Props = {
	task: Task;
};

const Completed = ({ task }: Props) => {
	const { update } = useTasks();
	const { makeUpdate } = useTasksHistory();

	const handleToggleTask = (newCompleted: boolean) => {
		if (newCompleted === task.completed) return;

		update({ id: task.id, completed: newCompleted });
		makeUpdate({
			type: 'update',
			property: 'completed',
			id: task.id,
			oldValue: task.completed,
			newValue: newCompleted,
		});
	};

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={handleToggleTask}
			className='rounded-full'
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default Completed;
