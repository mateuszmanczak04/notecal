import Link from 'next/link';

const page = () => {
	return (
		<main className='mx-auto max-w-lg px-8'>
			<h1 className='text-3xl font-bold'>Invalid URL</h1>
			<p className='mt-2 opacity-75'>Please ensure that you are using correct link.</p>
			<Link href='/auth/login' className='mt-4 block underline opacity-75'>
				Go to the login page
			</Link>
		</main>
	);
};

export default page;
