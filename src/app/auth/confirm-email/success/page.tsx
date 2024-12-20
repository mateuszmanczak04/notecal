import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Success message page shown after email confirmation.
 */
const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const email = searchParams?.email as string | undefined;

	if (!email) {
		notFound();
	}

	return (
		<main className='mx-auto max-w-lg px-8'>
			<h1 className='text-3xl font-bold'>Email confirmed successfully!</h1>
			<p className='mt-2 opacity-75'>
				Your email <strong>{email}</strong> is now confirmed. Your account is secure!
			</p>
			<Link href='/auth/login' className='mt-4 block underline opacity-75'>
				Go to the login page
			</Link>
		</main>
	);
};

export default page;
