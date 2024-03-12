import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();
	if (!session) redirect('/auth/signup');

	redirect('/calendar');
	return <div>page</div>;
};

export default page;
