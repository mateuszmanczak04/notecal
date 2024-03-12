import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';

const page = () => {
	return (
		<div className='grid place-items-center p-4'>
			<div className='mt-4 w-full max-w-[400px] rounded-md bg-gray-100 p-8'>
				<h1 className='w-full text-center text-4xl font-bold sm:text-5xl'>
					Sign Up
				</h1>
				<form className='mt-4 space-y-4'>
					<div className='w-full'>
						<label htmlFor='email' className='block font-medium'>
							Email
						</label>
						<Input type='email' id='email' className='mt-1 w-full' />
					</div>
					<div className='w-full'>
						<label htmlFor='password' className='block font-medium'>
							Password
						</label>
						<Input type='password' id='password' className='mt-1 w-full' />
					</div>
					<div className='w-full'>
						<label htmlFor='confirm-password' className='block font-medium'>
							Confirm Password
						</label>
						<Input
							type='password'
							id='confirm-password'
							className='mt-1 w-full'
						/>
					</div>
					<Button
						className='w-full'
						type='submit'
						variant='primary'
						size='medium'>
						Create Your Account
					</Button>
				</form>
				<Link
					href='/auth/signin'
					className='mt-4 block text-center text-gray-500'>
					Already have an account? Sign In
				</Link>
			</div>
		</div>
	);
};

export default page;
