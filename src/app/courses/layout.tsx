import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const layout = async ({
	modal,
	children,
}: {
	modal: React.ReactNode;
	children: React.ReactNode;
}) => {
	const session = await auth();
	if (!session) redirect('/auth/signup');

	return (
		<div className='mx-auto max-w-screen-sm p-4'>
			{children}
			{modal}
		</div>
	);
};

export default layout;
