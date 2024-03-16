import CreateCourse from '@/components/CreateCourse';
import Modal from '@/components/Modal';

const page = () => {
	return (
		<Modal className='w-[calc(100%-2rem)] max-w-screen-sm'>
			<CreateCourse />
		</Modal>
	);
};

export default page;
