import { Metadata } from 'next';
import ConfirmEmailForm from '../_components/confirm-email-form';

export const metadata: Metadata = {
	title: 'Confirm your e-mail address',
	robots: {
		index: false,
	},
};

/**
 * User may get to this page by following a link sent into his email inbox.
 */
const page = () => {
	return (
		<main className='mx-auto max-w-lg px-6 pt-8'>
			<h1 className='px-2 text-3xl font-bold'>Confirm your e-mail address</h1>
			<p className='mt-2 px-2 opacity-75'>
				Confirming your e-mail address will help you recover access to your account if you lose your password.
			</p>

			<ConfirmEmailForm />

			<p className='mt-4 px-2 opacity-75'>
				<small>We will not send you any marketing spam.</small>
			</p>
		</main>
	);
};

export default page;
