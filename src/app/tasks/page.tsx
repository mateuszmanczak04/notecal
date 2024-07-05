import List from '@/app/tasks/_components/list';
import Controls from './_components/controls';

const page = () => {
	return (
		<div className='mx-auto flex max-w-[800px] flex-col gap-8'>
			<Controls />
			<List />
		</div>
	);
};

export default page;
