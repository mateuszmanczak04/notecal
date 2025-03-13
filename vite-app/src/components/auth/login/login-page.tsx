import { NavLink } from 'react-router';
import LoginForm from './login-form';

/**
 *  This page is entirely server component with optional error from search params because I wanted to use "metadata" without splitting this component into 2 files.
 */
const LoginPage = () => {
	return (
		<main className='mx-auto max-w-lg px-4'>
			<title>Log In</title>
			<h1 className='px-4 text-3xl font-bold'>Log in to your account</h1>
			<p className='mt-2 px-4 opacity-75'>
				We&apos;re so happy to see you again! Your notes are waiting for you!
			</p>

			<NavLink to='/auth/register' className='mt-4 block px-4 underline opacity-75'>
				Don&apos;t have an account yet? Register now!
			</NavLink>

			<LoginForm />
		</main>
	);
};

export default LoginPage;
