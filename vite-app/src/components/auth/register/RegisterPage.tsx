import { NavLink } from 'react-router';
import RegisterForm from './RegisterForm';

// export const metadata: Metadata = {
// 	title: 'Join us today and improve your productivity!',
// };

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const RegisterPage = () => {
	return (
		<main className='mx-auto max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Create an account</h1>
			<p className='mt-2 px-4 opacity-75'>
				Don&apos;t hesitate and join Notecal community today. Simplify your university notes organization and
				improve productivity!
			</p>

			<NavLink to='/auth/login' className='mt-4 block px-4 underline opacity-75'>
				Already have an account? Log in instead!
			</NavLink>

			<RegisterForm />

			<p className='mt-4 px-4 opacity-75'>
				<small>
					By clicking <q>Create my account</q> you agree to our terms of service and privacy policy.
				</small>
			</p>
		</main>
	);
};

export default RegisterPage;
