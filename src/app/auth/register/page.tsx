import RegisterForm from '@/components/auth/register-form';
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
			<Card className='w-full max-w-sm border-none bg-primary/5 shadow-none'>
				<CardHeader>
					<CardTitle className='text-2xl'>Create an account</CardTitle>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
				<CardFooter>
					<Link
						href='/auth/login'
						className='mt-4 block text-center text-sm text-gray-500'>
						Already have an account? Log in
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default page;
