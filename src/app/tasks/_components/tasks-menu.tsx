import CreateTaskLink from '@/app/tasks/_components/create-task-link';
import SortTasks from '@/app/tasks/_components/sort-tasks';

const TasksMenu = () => {
	return (
		<div className='flex flex-col gap-2 sm:flex-row'>
			<SortTasks />
			<CreateTaskLink />
		</div>
	);
};

export default TasksMenu;
