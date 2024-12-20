import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import db from '@/lib/db';
import bcryptjs from 'bcryptjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import login from '../_actions/login';
import sendConfirmationEmail from '../_actions/send-confirmation-email';

export const metadata: Metadata = {
	title: 'Join us today and improve your productivity!',
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

		if (password.length < 6) {
			redirect('/auth/register?error=Password must be at least 6 characters long.');
		}

		const existingUser = await db.user.findUnique({ where: { email } });

		// Email taken
		if (existingUser) {
			redirect('/auth/register?error=This email is already taken.');
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		// Create user
		const user = await db.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		// Create user's settings
		await db.settings.create({
			data: {
				userId: user.id,
				language: 'en',
			},
		});

		sendConfirmationEmail({ email });

		// Automatically log new user in
		await login({ email, password });
	};

	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Create an account</h1>
			<p className='mt-2 px-4 opacity-75'>
				Don&apos;t hesitate and join Notecal community today. Simplify your university notes organization and
				improve productivity!
			</p>

			<Link href='/auth/login' className='mt-4 block px-4 underline opacity-75'>
				Already have an account? Log in instead!
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
					Create my account
				</Button>

				{error && <p className='mx-2 mt-4 text-error-600 dark:text-error-400'>{error}</p>}

				<div className=' grid place-content-center'>
					<FormLoadingSpinner className='mt-4' />
				</div>
			</form>

			<p className='mt-4 px-4 opacity-75'>
				<small>
					By clicking <q>Create my account</q> you agree to our terms of service and privacy policy.
				</small>
			</p>
		</main>
	);
};

export default page;
