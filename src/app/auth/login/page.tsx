import LoginForm from '@/components/auth/login-form';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const page = () => {
	return (
		<div className='grid place-items-center p-4'>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login to your account</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
				<CardFooter>
					<Link
						href='/auth/register'
						className='mt-4 block text-center text-gray-500'>
						Don&apos;t have an account yet? Register now
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default page;
