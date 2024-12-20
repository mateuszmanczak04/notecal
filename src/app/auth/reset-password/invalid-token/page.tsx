import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
	return (
		<main className='mx-auto max-w-lg px-8'>
			<h1 className='text-3xl font-bold'>Your token is stale</h1>
			<p className='mt-2 opacity-75'>The token from your URL is invalid, has expired or was already used.</p>
			<Button asChild className='mt-4 w-full'>
				<Link href='/auth/forgot-password'>Generate a new one</Link>
			</Button>
			<Link href='/auth/login' className='mt-4 block underline opacity-75'>
				Go to the login page
			</Link>
		</main>
	);
};

export default page;
