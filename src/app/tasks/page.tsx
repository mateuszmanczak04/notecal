import Controls from './_components/controls';
import Tasks from './_components/tasks';

const page = () => {
	return (
		<div className='mx-auto flex max-w-[800px] flex-col gap-8'>
			<Controls />
			<Tasks />
		</div>
	);
};

export default page;
