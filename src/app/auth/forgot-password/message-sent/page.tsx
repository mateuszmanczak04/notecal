import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * User is redirected to this page after submitting "Forgot password" form but only if that action was successful.
 */
const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const email = searchParams?.email as string | undefined;

	if (!email) {
		notFound();
	}

	return (
		<main className='mx-auto max-w-lg px-4'>
			<h1 className='text-3xl font-bold'>Email sent successfully</h1>
			<p className='mt-2 opacity-75'>
				Now you have to check your inbox <strong>({email})</strong> for further instructions.
			</p>
			<p className='mt-6 opacity-75'>In case something went wrong you can always:</p>
			<Button asChild className='mt-4 w-full' variant='secondary'>
				<Link href='/auth/forgot-password'>Try again</Link>
			</Button>
		</main>
	);
};

export default page;
