import CreateTaskForm from './components/create-task-form';
import SortTasks from './components/sort-tasks';
import TasksList from './components/tasks-list';

const TasksPage = () => {
	return (
		<main className='mx-auto max-w-3xl space-y-4 p-4'>
			<title>Tasks</title>
			<CreateTaskForm />
			<SortTasks />
			<TasksList />
		</main>
	);
};

export default TasksPage;
