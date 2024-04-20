import TasksList from '@/components/tasks/tasks-list';

const page = async () => {
	return (
		<div>
			<h1 className='text-2xl font-bold'>Your Tasks To Do:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				<TasksList />
			</div>
		</div>
	);
};

export default page;
