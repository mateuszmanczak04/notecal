import Link from 'next/link';

const page = () => {
	return (
		<main className='mx-auto max-w-lg px-8'>
			<h1 className='text-3xl font-bold'>That is illegal</h1>
			<p className='mt-2 opacity-75'>
				You are trying to break into someone&apos;s else account, that&apos;s not fair! We will inform the
				account&apos;s owner about this incident.
			</p>
			<Link href='/auth/login' className='mt-4 block underline opacity-75'>
				Go to the login page
			</Link>
		</main>
	);
};

export default page;
