import { Button } from '@/components/button';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import { Metadata } from 'next';
import Link from 'next/link';
import resetPassword from '../_actions/reset-password';

export const metadata: Metadata = {
	title: 'Reset your password',
	robots: {
		index: false,
	},
};

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const email = searchParams?.email as string | undefined;
	const token = searchParams?.token as string | undefined;

	if (!email || !token) {
		// Invalid url page
		return (
			<main className='mx-auto max-w-lg px-8'>
				<h1 className='text-3xl font-bold'>Invalid URL</h1>
				<p className='mt-2 opacity-75'>Please ensure that you are using correct link.</p>
				<Link href='/auth/login' className='mt-4 block underline opacity-75'>
					Go to the login page
				</Link>
			</main>
		);
	}

	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Reset Your Password</h1>
			<p className='mt-2 px-4 opacity-75'>
				It is the last step to get access to your account again! After the submission you will be automatically
				logged in.
			</p>

			<form
				className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
				action={resetPassword}>
				<label htmlFor='password' className='ml-2 block font-medium'>
					New Password
				</label>
				<Input id='password' name='password' type='password' className='mt-1' required placeholder='*******' />

				<input type='hidden' name='email' value={email} />
				<input type='hidden' name='token' value={token} />

				<Button type='submit' className='mt-4 w-full'>
					<FormLoadingSpinner className='h-5 w-5' />
					Update my password
				</Button>
			</form>
		</main>
	);
};

export default page;
