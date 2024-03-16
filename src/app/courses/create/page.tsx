import CreateCourse from '@/components/CreateCourse';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const page = async () => {
	// cannot create a course without being authenticated
	const session = await auth();
	if (!session) {
		redirect('/auth/signup');
	}

	return (
		<div className='mx-auto max-w-screen-sm p-4'>
			<CreateCourse />
		</div>
	);
};

export default page;
