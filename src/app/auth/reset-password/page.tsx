import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import db from '@/lib/db';
import brcyptjs from 'bcryptjs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
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
		redirect('/auth/reset-password/invalid-url');
	}

	/**
	 * An action invoked after form submission. It updates user's password and logs they in.
	 */
	const formAction = async (formData: FormData) => {
		'use server';
		const password = formData.get('password')?.toString();

		// Validate the password
		if (!password || password.length === 0) return;

		const resetToken = await db.resetPasswordToken.findFirst({
			where: { token },
		});

		// If token doesn't exist in db, show error message to user
		if (!resetToken) {
			redirect('/auth/reset-password/invalid-token');
		}

		if (resetToken.email !== email) {
			redirect('/auth/reset-password/forbidden');
		}

		// Check if user with current email exists
		const user = await db.user.findFirst({
			where: { email: resetToken.email },
		});
		if (!user) {
			redirect('/auth/reset-password/forbidden');
		}

		// Update user's password
		const hashedPassword = await brcyptjs.hash(password, 10);
		await db.user.update({
			where: { email: resetToken.email },
			data: { password: hashedPassword },
		});

		// Delete token
		await db.resetPasswordToken.deleteMany({
			where: { email: resetToken.email },
		});

		// Automatically log user in
		const fd = new FormData();
		fd.set('email', email);
		fd.set('password', password);
		await login(fd);
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
					<FormLoadingSpinner className='h-5 w-5' />
					Update my password
				</Button>
			</form>
		</main>
	);
};

export default page;
