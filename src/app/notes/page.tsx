import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();
	if (!session) redirect('/auth/register');

	redirect('/calendar');
	return <div>page</div>;
};

export default page;
