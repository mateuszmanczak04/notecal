import { auth } from '@/auth';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import RegisterForm from '../../../components/auth/register-form';

const page = async () => {
	const session = await auth();
	if (session) redirect('/calendar');

	return (
		<div className='grid place-items-center p-4'>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Create an account</CardTitle>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
				<CardFooter>
					<Link
						href='/auth/login'
						className='mt-4 block text-center text-gray-500'>
						Already have an account? Log in
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default page;
