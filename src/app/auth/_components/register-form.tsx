'use client';

import { Button } from '@/components/button';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import { useMutation } from '@tanstack/react-query';
import register from '../_actions/register';

const RegisterForm = () => {
	const { mutate, data } = useMutation({
		mutationFn: register,
	});

	return (
		<form
			className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
			action={mutate}>
			<label htmlFor='email' className='ml-2 block font-medium'>
				Email
			</label>
			<Input id='email' type='email' name='email' className='mt-1' required placeholder='example@abc.com' />

			<label htmlFor='password' className='ml-2 mt-4 block font-medium'>
				Password
			</label>
			<Input id='password' type='password' name='password' className='mt-1' required placeholder='******' />

			<Button type='submit' className='mt-6 w-full'>
				<FormLoadingSpinner className='h-5 w-5' />
				Create my account
			</Button>

			{data?.error && <p className='mx-2 mt-4 text-error-600 dark:text-error-400'>{data?.error}</p>}
		</form>
	);
};

export default RegisterForm;
