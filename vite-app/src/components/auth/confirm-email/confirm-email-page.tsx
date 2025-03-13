import ConfirmEmailForm from './confirm-email-form';

/**
 * User may get to this page by following a link sent into his email inbox.
 */
const ConfirmEmailPage = () => {
	return (
		<main className='mx-auto max-w-lg px-6 pt-8'>
			<title>Confirm Your Email</title>
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

export default ConfirmEmailPage;
