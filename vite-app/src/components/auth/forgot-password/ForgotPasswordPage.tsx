import { NavLink } from 'react-router';
import ForgotPasswordForm from './ForgotPasswordForm';

// export const metadata: Metadata = {
// 	title: 'Forgot your password?',
// 	robots: {
// 		index: false,
// 	},
// };

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const ForgotPasswordPage = () => {
	return (
		<main className='mx-auto max-w-lg px-4'>
			<title>Reset Your Password</title>
			<h1 className='px-4 text-3xl font-bold'>Reset Your Password</h1>
			<p className='mt-2 px-4 opacity-75'>
				Don&apos;t worry! We are her to help you recover your account access. Simply enter your e-mail address
				here and we will send you further instructions!
			</p>

			<NavLink to='/auth/login' className='mt-4 block px-4 underline opacity-75'>
				Go back to the login page if it was a missclick
			</NavLink>

			<ForgotPasswordForm />

			<p className='mt-4 px-4 opacity-75'>
				<small>
					Please note that email will be sent only if you have confirmed your email address previously.
				</small>
			</p>
		</main>
	);
};

export default ForgotPasswordPage;
