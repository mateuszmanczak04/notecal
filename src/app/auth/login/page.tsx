import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '../_components/login-form';

export const metadata: Metadata = {
	title: 'Login to your account!',
};

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const page = () => {
	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Log in to your account</h1>
			<p className='mt-2 px-4 opacity-75'>
				We&apos;re so happy to see you again! Your notes are waiting for you!
			</p>

			<Link href='/auth/register' className='mt-4 block px-4 underline opacity-75'>
				Don&apos;t have an account yet? Register now!
			</Link>

			<LoginForm />
		</main>
	);
};

export default page;
