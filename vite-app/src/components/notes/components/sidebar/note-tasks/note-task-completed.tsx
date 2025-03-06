import { Check } from 'lucide-react';
import { T_Task } from '../../../../../types';
import { cn } from '../../../../../utils/cn';
import { useTaskCompleted } from '../../../../tasks/hooks/use-task-completed';

type T_Props = {
	task: T_Task;
};

const NoteTaskCompleted = ({ task }: T_Props) => {
	const { isPending, toggleTaskCompleted } = useTaskCompleted(task);

	return (
		<button
			role='checkbox'
			onClick={() => toggleTaskCompleted(!task.completed)}
			className={cn(
				'size-6 rounded-md border border-neutral-200 p-1 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800',
				isPending && 'pointer-events-none opacity-50',
				task.completed && 'border-neutral-300 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700',
			)}
			aria-label='task completed checkbox'
			title='task completed checkbox'>
			{task.completed && <Check className='size-4' />}
		</button>
	);
};

export default NoteTaskCompleted;
