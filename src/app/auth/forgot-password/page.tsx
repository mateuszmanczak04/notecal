import { Button } from '@/components/button';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import sendRecoveryEmail from '../_actions/send-recovery-email';

export const metadata: Metadata = {
	title: 'Forgot your password?',
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
	const error = searchParams?.error;
	const message = searchParams?.message;

	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Reset Your Password</h1>
			<p className='mt-2 px-4 opacity-75'>
				Don&apos;t worry! We are her to help you recover your account access. Simply enter your e-mail address
				here and we will send you further instructions!
			</p>

			<Link href='/auth/login' className='mt-4 block px-4 underline opacity-75'>
				Go back to the login page if it was a missclick
			</Link>

			{/* Main form */}
			<form
				className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
				action={sendRecoveryEmail}>
				<label htmlFor='email' className='ml-2 block font-medium'>
					Email
				</label>
				<Input id='email' type='email' name='email' className='mt-1' required placeholder='example@abc.com' />

				<Button type='submit' className='mt-4 w-full' disabled={!!message}>
					<FormLoadingSpinner className='h-5 w-5' />
					<Mail className='h-5 w-5' />
					Send recovery message
				</Button>
			</form>

			{/* Result messages */}
			{error && <p className='mx-4 mt-4 text-error-600 dark:text-error-400'>{error}</p>}
			{message && <p className='mx-4 mt-4 text-success-600 dark:text-success-400'>{message}</p>}

			<p className='mt-4 px-4 opacity-75'>
				<small>
					Please note that email will be sent only if you have confirmed your email address previously.
				</small>
			</p>
		</main>
	);
};

export default page;
