import ResetPasswordForm from './reset-password-form';

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const ResetPasswordPage = () => {
	return (
		<main className='mx-auto max-w-lg px-4'>
			<title>Reset Your Password</title>
			<h1 className='px-4 text-3xl font-bold'>Reset Your Password</h1>
			<p className='mt-2 px-4 opacity-75'>
				It is the last step to get access to your account again! After the submission you will be automatically
				logged in.
			</p>

			<ResetPasswordForm />
		</main>
	);
};

export default ResetPasswordPage;
