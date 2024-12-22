import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
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

const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const email = searchParams?.email as string | undefined;
	const token = searchParams?.token as string | undefined;

	if (!email || !token) {
		redirect('/auth/reset-password/invalid-url');
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
