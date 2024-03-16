import CreateCourse from '@/components/CreateCourse';
import Modal from '@/components/Modal';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const page = async () => {
	// cannot create a course without being authenticated
	const session = await auth();
	if (!session) {
		redirect('/auth/signup');
	}

	return (
		<Modal className='w-[calc(100%-2rem)] max-w-screen-sm'>
			<CreateCourse />
		</Modal>
	);
};

export default page;
