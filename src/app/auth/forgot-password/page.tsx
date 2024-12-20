import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import db from '@/lib/db';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormLoadingSpinner from '../../../components/common/form-loading-spinner';
import sendResetPasswordEmail from '../_actions/send-reset-password-email';

export const metadata: Metadata = {
	title: 'Forgot your password?',
	robots: {
		index: false,
	},
};

const page = async () => {
	/**
	 * An action invoked after form submission. It sends the recovery email to the user.
	 */
	const formAction = async (formData: FormData) => {
		'use server';
		// Validate the email
		const email = formData.get('email')?.toString().trim();
		if (!email || email.length === 0) return;

		// Check if user exists and has email verified,
		// if not, fake that action resolved successfully
		const user = await db.user.findUnique({ where: { email } });

		if (!user || !user.emailVerified) {
			redirect(`/auth/forgot-password/message-sent?email=${email}`);
		}

		// Send email
		const res = await sendResetPasswordEmail(email);

		// Show potential errors
		if (res.error) {
			redirect(`/auth/forgot-password/error`);
		}

		redirect(`/auth/forgot-password/message-sent?email=${email}`);
	};

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
				action={formAction}>
				<label htmlFor='email' className='ml-2 block font-medium'>
					Email
				</label>
				<Input id='email' name='email' className='mt-1' required placeholder='example@abc.com' />

				<Button type='submit' className='mt-4 w-full'>
					<Mail className='h-4 w-4' />
					Send recovery message
				</Button>

				<div className='mt-4 grid place-content-center'>
					<FormLoadingSpinner />
				</div>
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
