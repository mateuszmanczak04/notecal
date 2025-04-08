import { useTasks } from '../../../hooks/use-tasks';
import { T_Task } from '../../../types';
import ErrorMessage from '../../error-message';
import TaskItem from './task-item';

/** List of tasks for /tasks page */
const TasksList = () => {
	const { data: tasks, isPending, error } = useTasks();

	if (isPending)
		return (
			<div>
				<div className='mt-4 h-8 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-4 h-8 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-4 h-8 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
			</div>
		);

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return <p className='mt-4 text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	console.table(tasks.map(t => ({ dueDate: t.dueDate, type: typeof t.dueDate, title: t.title })));

	return (
		<div className='relative'>
			{tasks.map((task: T_Task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</div>
	);
};

export default TasksList;
