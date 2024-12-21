import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'An error occurred',
	robots: {
		index: false,
	},
};

const page = () => {
	return (
		<main className='mx-auto  max-w-lg px-4'>
			<h1 className='px-4 text-3xl font-bold'>Authentication error occurred</h1>
			<p className='mt-2 px-4 opacity-75'>
				There was something wrong with the authentication process. Ensure that you have filled everything
				correctly or come back in a while to try again 😁
			</p>
			<Link href='/auth/login' className='mt-4 block px-4 underline opacity-75'>
				Go back to the login page
			</Link>
		</main>
	);
};

export default page;
