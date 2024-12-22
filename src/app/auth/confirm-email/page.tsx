import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
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

	if (!token) {
		redirect('/auth/confirm-email/invalid-token');
	}

	return (
		<main className='mx-auto  max-w-lg px-6'>
			<h1 className='px-2 text-3xl font-bold'>Confirm your e-mail address</h1>
			<p className='mt-2 px-2 opacity-75'>
				Confirming your e-mail address will help you recover access to your account if you lose your password.
			</p>

			<form action={confirmEmail} className='mt-4 '>
				<input type='hidden' name='token' value={token} />
				<Button type='submit' className='w-full'>
					<FormLoadingSpinner className='h-5 w-5' />
					<Mail className='h-5 w-5' />
					Confirm
				</Button>
			</form>

			<p className='mt-4 px-2 opacity-75'>
				<small>We will not send you any marketing spam.</small>
			</p>
		</main>
	);
};

export default page;
