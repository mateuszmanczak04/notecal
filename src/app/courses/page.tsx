import Controls from './_components/controls';
import List from './_components/list';

const page = () => {
	return (
		<>
			<div className='flex flex-col gap-8'>
				<Controls />
				<List />
			</div>
		</>
	);
};

export default page;
