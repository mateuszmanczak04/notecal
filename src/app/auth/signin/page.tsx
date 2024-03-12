import SignInForm from '@/app/auth/signin/SignInForm';
import { auth } from '@/utils/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();
	if (session) redirect('/calendar');

	return (
		<div className='grid place-items-center p-4'>
			<div className='mt-4 w-full max-w-[400px] rounded-md bg-gray-100 p-8'>
				<h1 className='w-full text-center text-4xl font-bold sm:text-5xl'>
					Sign In
				</h1>
				<SignInForm />
				<Link
					href='/auth/signup'
					className='mt-4 block text-center text-gray-500'>
					Don&apos;t have an account? Sign Up
				</Link>
			</div>
		</div>
	);
};

export default page;
