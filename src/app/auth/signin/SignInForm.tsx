'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import authenticate from '@/actions/authenticate';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);
	const { pending } = useFormStatus();
	const router = useRouter();

	return (
		<form
			className='mt-4 space-y-4'
			action={async (fd: FormData) => {
				await dispatch(fd);
				router.refresh();
			}}>
			<div className='w-full'>
				<label htmlFor='email' className='block font-medium'>
					Email
				</label>
				<Input
					type='email'
					name='email'
					id='email'
					required
					placeholder='example@abc.com'
					className='mt-1 w-full'
				/>
			</div>
			<div className='w-full'>
				<label htmlFor='password' className='block font-medium'>
					Password
				</label>
				<Input
					type='password'
					id='password'
					name='password'
					required
					placeholder='********'
					className='mt-1 w-full'
				/>
			</div>
			<Button
				type='submit'
				aria-disabled={pending}
				className='w-full'
				variant='primary'
				size='medium'>
				Log In to Your Account
			</Button>
		</form>
	);
};

export default SignInForm;
