'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import LoadingSpinner from '@/components/loading-spinner';
import Link from 'next/link';
import React, { useState, useTransition } from 'react';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}).then(res => res.json());
			if ('error' in res) {
				setError(res.error);
			}
		});
	};

	return (
		<form
			className='mt-4 rounded-xl border border-neutral-200 p-4 dark:border-transparent dark:bg-neutral-800'
			onSubmit={handleSubmit}>
			<label htmlFor='email' className='ml-2 block font-medium'>
				Email
			</label>
			<Input
				id='email'
				type='email'
				name='email'
				className='mt-1'
				required
				placeholder='example@abc.com'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>

			<label htmlFor='password' className='ml-2 mt-4 block font-medium'>
				Password
			</label>
			<Input
				id='password'
				type='password'
				name='password'
				className='mt-1'
				required
				placeholder='******'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>

			<Link href='/auth/forgot-password' className='mt-4 block px-2 text-sm underline opacity-75'>
				Forgot your password?
			</Link>

			<Button type='submit' className='mt-6 w-full'>
				{isPending && <LoadingSpinner className='h-5 w-5' />}
				Log in
			</Button>

			{error && <p className='mx-2 mt-4 text-error-600 dark:text-error-400'>{error}</p>}
		</form>
	);
};

export default LoginForm;
