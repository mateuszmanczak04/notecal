import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const page = () => {
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

			<form
				className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
				action={sendRecoveryEmail}>
				<label htmlFor='email' className='ml-2 block font-medium'>
					Email
				</label>
				<Input id='email' type='email' name='email' className='mt-1' required placeholder='example@abc.com' />

				<Button type='submit' className='mt-4 w-full'>
					<FormLoadingSpinner className='h-5 w-5' />
					<Mail className='h-5 w-5' />
					Send recovery message
				</Button>
			</form>

			<p className='mt-4 px-4 opacity-75'>
				<small>
					Please note that email will be sent only if you have confirmed your email address previously.
				</small>
			</p>
		</main>
	);
};

export default page;
