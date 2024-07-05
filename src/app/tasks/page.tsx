import TasksList from '@/app/tasks/_components/tasks-list';
import TasksMenu from '@/app/tasks/_components/tasks-menu';

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
