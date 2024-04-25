import CreateTaskLink from '@/components/tasks/create-task-link';
import SortTasks from '@/components/tasks/sort-tasks';

const TasksMenu = () => {
	return (
		<div className='flex flex-col gap-2 sm:flex-row'>
			<SortTasks />
			<CreateTaskLink />
		</div>
	);
};

export default TasksMenu;
