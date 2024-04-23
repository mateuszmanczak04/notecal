import CreateTaskButton from '@/components/tasks/create-task-button';
import SortTasks from '@/components/tasks/sort-tasks';
import TasksViewMode from '@/components/tasks/tasks-view-mode';

const TasksMenu = () => {
	return (
		<div className='flex flex-col items-center gap-2 sm:flex-row'>
			<SortTasks />
			<CreateTaskButton />
			<TasksViewMode />
		</div>
	);
};

export default TasksMenu;
