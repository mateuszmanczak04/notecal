import Controls from './_components/controls';
import Courses from './_components/courses';

const page = () => {
	return (
		<>
			<div className='mx-auto flex max-w-[800px] flex-col gap-8'>
				<Controls />
				<Courses />
			</div>
		</>
	);
};

export default page;
