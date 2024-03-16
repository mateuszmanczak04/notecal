'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import signup from '@/actions/signup';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
	const [errorMessage, dispatch] = useFormState(signup, undefined);
	const { pending } = useFormStatus();
	const router = useRouter();

	return (
		<form
			className='mt-4 space-y-4'
			action={async (fd: FormData) => {
				dispatch(fd);
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
			<div className='w-full'>
				<label htmlFor='confirmPassword' className='block font-medium'>
					Confirm Password
				</label>
				<Input
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					required
					placeholder='******** (same as above)'
					className='mt-1 w-full'
				/>
			</div>
			<Button
				type='submit'
				aria-disabled={pending}
				className='w-full'
				variant='primary'
				size='medium'>
				Create An Account
			</Button>
			{errorMessage && (
				<p className='text-center text-red-500'>{errorMessage}</p>
			)}
			{pending && <p className='text-center'>Loading...</p>}
		</form>
	);
};

export default SignUpForm;
