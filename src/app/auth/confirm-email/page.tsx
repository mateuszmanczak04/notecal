import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import confirmEmail from '../_actions/confirm-email';

export const metadata: Metadata = {
	title: 'Confirm your e-mail address',
	robots: {
		index: false,
	},
};

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * User may get to this page by following a link sent into his email inbox.
 */
const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const token = searchParams?.token as string | undefined;
	const error = searchParams?.error;
	const message = searchParams?.message;

	return (
		<main className='mx-auto  max-w-lg px-6'>
			<h1 className='px-2 text-3xl font-bold'>Confirm your e-mail address</h1>
			<p className='mt-2 px-2 opacity-75'>
				Confirming your e-mail address will help you recover access to your account if you lose your password.
			</p>

			{/* Main form */}
			<form action={confirmEmail} className='mt-4 '>
				<input type='hidden' name='token' value={token} />
				<Button type='submit' className='w-full' disabled={!!error || !!message}>
					<FormLoadingSpinner className='h-5 w-5' />
					<Mail className='h-5 w-5' />
					Confirm
				</Button>
			</form>

			{/* Result messages */}
			{error && <p className='mx-4 mt-4 text-error-600 dark:text-error-400'>{error}</p>}
			{message && <p className='mx-4 mt-4 text-success-600 dark:text-success-400'>{message}</p>}

			<p className='mt-4 px-2 opacity-75'>
				<small>We will not send you any marketing spam.</small>
			</p>
		</main>
	);
};

export default page;
