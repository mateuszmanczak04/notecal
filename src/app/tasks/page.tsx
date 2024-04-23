import TasksList from '@/components/tasks/tasks-list';
import TasksMenu from '@/components/tasks/tasks-menu';

const page = () => {
	return (
		<div>
			<h1 className='text-2xl font-bold'>Your Tasks To Do:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				<TasksMenu />
				<TasksList />
			</div>
		</div>
	);
};

export default page;
