import { T_Task } from '../../../types';
import { cn } from '../../../utils/cn';
import { useTaskTitle } from '../hooks/use-task-title';

type T_Props = {
	task: T_Task;
};

const TaskTitle = ({ task }: T_Props) => {
	const { handleKeyDown, handleSubmit, isPending, titleRef } = useTaskTitle(task);

	return (
		<p
			ref={titleRef}
			contentEditable
			className={cn(
				'cursor-text break-all text-sm font-semibold outline-none transition-colors',
				isPending && 'pointer-events-none opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default TaskTitle;
