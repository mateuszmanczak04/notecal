import { Button } from '@/components/button';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import { Metadata } from 'next';
import Link from 'next/link';
import login from '../_actions/login';

export const metadata: Metadata = {
	title: 'Login to your account!',
};

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const error = searchParams?.error;

	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Log in to your account</h1>
			<p className='mt-2 px-4 opacity-75'>
				We&apos;re so happy to see you again! Your notes are waiting for you!
			</p>

			<Link href='/auth/register' className='mt-4 block px-4 underline opacity-75'>
				Don&apos;t have an account yet? Register now!
			</Link>

			<form
				className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
				action={login}>
				<label htmlFor='email' className='ml-2 block font-medium'>
					Email
				</label>
				<Input id='email' type='email' name='email' className='mt-1' required placeholder='example@abc.com' />

				<label htmlFor='password' className='ml-2 mt-4 block font-medium'>
					Password
				</label>
				<Input id='password' type='password' name='password' className='mt-1' required placeholder='******' />

				<Link href='/auth/forgot-password' className='mt-4 block px-2 text-sm underline opacity-75'>
					Forgot your password?
				</Link>

				<Button type='submit' className='mt-6 w-full'>
					<FormLoadingSpinner className='h-5 w-5' />
					Log in
				</Button>

				{error && <p className='mx-2 mt-4 text-error-600 dark:text-error-400'>{error}</p>}
			</form>
		</main>
	);
};

export default page;
