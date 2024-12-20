import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import login from '../_actions/login';

export const metadata: Metadata = {
	title: 'Login to your account!',
};

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const error = searchParams?.error;

	/**
	 * Creates a new account if there are no issues.
	 */
	const formAction = async (formData: FormData) => {
		'use server';
		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString();

		// Validate email and password
		if (!email || email.length === 0 || !password || password.length === 0) return;

		// Automatically log new user in
		const { error } = await login({ email, password });
		redirect(`/auth/login?error=${error}`);
	};

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
				action={formAction}>
				<label htmlFor='email' className='ml-2 block font-medium'>
					Email
				</label>
				<Input id='email' type='email' name='email' className='mt-1' required placeholder='example@abc.com' />

				<label htmlFor='password' className='ml-2 mt-4 block font-medium'>
					Password
				</label>
				<Input id='password' type='password' name='password' className='mt-1' required placeholder='******' />

				<Button type='submit' className='mt-6 w-full'>
					Log in
				</Button>

				{error && <p className='mx-2 mt-4 text-error-600 dark:text-error-400'>{error}</p>}

				<div className=' grid place-content-center'>
					<FormLoadingSpinner className='mt-4' />
				</div>
			</form>
		</main>
	);
};

export default page;
