import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
	return (
		<main className='mx-auto max-w-lg px-8'>
			<h1 className='text-3xl font-bold'>Something went wrong!</h1>
			<p className='mt-2 opacity-75'>
				There was an error when sending a recovery message, please try again later 😭.
			</p>
			<Button asChild className='mt-4 w-full'>
				<Link href='/auth/forgot-password'>Try again now</Link>
			</Button>
			<Link href='/auth/login' className='mt-4 block underline opacity-75'>
				Go to the login page
			</Link>
		</main>
	);
};

export default page;
