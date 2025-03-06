'use client';

import { Checkbox } from '../../../components/checkbox';
import { T_Task } from '../../../types';
import { cn } from '../../../utils/cn';
import { useTaskCompleted } from '../hooks/use-task-completed';

type T_Props = {
	task: T_Task;
};

const TaskCompleted = ({ task }: T_Props) => {
	const { toggleTaskCompleted, isPending } = useTaskCompleted(task);

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={toggleTaskCompleted}
			className={cn(isPending && 'pointer-events-none opacity-50')}
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default TaskCompleted;
