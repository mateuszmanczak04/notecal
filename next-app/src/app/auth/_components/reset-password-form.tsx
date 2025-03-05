'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import LoadingSpinner from '@/components/loading-spinner';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

const ResetPasswordForm = () => {
	const [error, setError] = useState('');
	const [isPending, startTransition] = useTransition();
	const [password, setPassword] = useState('');
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await fetch('/api/auth/reset-password', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: searchParams.get('email')?.trim().toLowerCase(),
					token: searchParams.get('token'),
					password,
				}),
			}).then(res => res.json());
			if ('error' in res) {
				setError(res.error);
			}
			if ('message' in res) {
				router.push(DEFAULT_LOGIN_REDIRECT);
			}
		});
	};

	return (
		<>
			<form
				className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
				onSubmit={handleSubmit}>
				<label htmlFor='password' className='ml-2 block font-medium'>
					New Password
				</label>
				<Input
					id='password'
					name='password'
					type='password'
					className='mt-1'
					required
					placeholder='*******'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>

				<Button type='submit' className='mt-4 w-full'>
					{isPending && <LoadingSpinner className='h-5 w-5' />}
					Update my password
				</Button>
			</form>

			{error && <p className='mx-4 mt-4 text-error-600 dark:text-error-400'>{error}</p>}
		</>
	);
};

export default ResetPasswordForm;
