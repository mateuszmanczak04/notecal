import CreateTaskLink from '@/components/tasks/create-task-link';
import SortTasks from '@/components/tasks/sort-tasks';
import TasksViewMode from '@/components/tasks/tasks-view-mode';

const TasksMenu = () => {
	return (
		<div className='flex flex-col gap-2 sm:flex-row'>
			<SortTasks />
			<CreateTaskLink />
			<TasksViewMode />
		</div>
	);
};

export default TasksMenu;
