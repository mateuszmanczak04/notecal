import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import db from '@/lib/db';
import brcyptjs from 'bcryptjs';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import login from '../_actions/login';

export const metadata: Metadata = {
	title: 'Reset your password',
	robots: {
		index: false,
	},
};

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const email = searchParams?.email as string | undefined;
	const token = searchParams?.token as string | undefined;

	if (!email || !token) {
		// TODO: display an error
		return notFound();
	}

	/**
	 * An action invoked after form submission. It updates user's password and logs they in.
	 */
	const formAction = async (formData: FormData) => {
		'use server';
		const password = formData.get('password')?.toString();

		// Validate the password
		if (!password || password.length === 0) return;

		// Check if reset token exists in the database
		const resetToken = await db.resetPasswordToken.findFirst({
			where: { token },
		});

		if (!resetToken) {
			// TODO: display an error about the stale token
			notFound();
		}

		// Check if user with current email exists
		const user = await db.user.findFirst({
			where: { email: resetToken.email },
		});
		if (!user) {
			// TODO: display an error
			notFound();
		}

		// Update user's password
		const hashedPassword = await brcyptjs.hash(password, 10);
		await db.user.update({
			where: { email: resetToken.email },
			data: { password: hashedPassword },
		});

		// Delete the token
		await db.resetPasswordToken.deleteMany({
			where: { email: resetToken.email },
		});

		// Automatically login user in
		await login({ email, password });
	};

	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Reset Your Password</h1>
			<p className='mt-2 px-4 opacity-75'>
				It is the last step to get access to your account again! After the submission you will be automatically
				logged in.
			</p>

			<form
				className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
				action={formAction}>
				<label htmlFor='password' className='ml-2 block font-medium'>
					New Password
				</label>
				<Input id='password' name='password' type='password' className='mt-1' required placeholder='*******' />

				<Button type='submit' className='mt-4 w-full'>
					Update my password
				</Button>

				<div className='mt-4 grid place-content-center'>
					<FormLoadingSpinner />
				</div>
			</form>
		</main>
	);
};

export default page;
