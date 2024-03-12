import Link from 'next/link';
import SignUpForm from './SignUpForm';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

const page = async () => {
	const session = await auth();
	if (session) redirect('/calendar');

	return (
		<div className='grid place-items-center p-4'>
			<div className='mt-4 w-full max-w-[400px] rounded-md bg-gray-100 p-8'>
				<h1 className='w-full text-center text-4xl font-bold sm:text-5xl'>
					Sign Up
				</h1>
				<SignUpForm />
				<Link
					href='/auth/signin'
					className='mt-4 block text-center text-gray-500'>
					Already have an account? Sign In
				</Link>
			</div>
		</div>
	);
};

export default page;
