import CreateTaskForm from '@/app/tasks/_components/create-task-form';
import { Separator } from '@/components/ui/separator';

const CreateTaskPage = () => {
	return (
		<div className='mx-auto max-w-screen-sm p-4'>
			<h1 className='text-2xl font-semibold'>Create a New Task</h1>
			<Separator className='mb-6 mt-2' />
			<CreateTaskForm />
		</div>
	);
};

export default CreateTaskPage;
