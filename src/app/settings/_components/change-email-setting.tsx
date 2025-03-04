'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/input';
import LoadingSpinner from '@/components/loading-spinner';
import SuccessMessage from '@/components/success-message';
import { useState, useTransition } from 'react';

const ChangeEmailSetting = () => {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			setMessage('');
			setError('');
			const res = await fetch('/api/user/update-email', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
			}).then(res => res.json());
			if ('error' in res) {
				setError(res.error);
			}
			if ('message' in res) {
				setMessage(res.message);
				setEmail('');
				setPassword('');
			}
		});
	};
	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your e-mail address</h2>

			<form onSubmit={handleSubmit} className='mt-2 flex flex-col gap-4'>
				<div>
					<label htmlFor='change-email-email' className='mb-1 block px-2 font-medium'>
						New e-mail
					</label>
					<Input
						placeholder='******'
						type='email'
						name='email'
						id='change-email-email'
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor='change-email-password' className='mb-1 block px-2 font-medium'>
						Your password
					</label>
					<Input
						placeholder='******'
						type='password'
						name='password'
						id='change-email-password'
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<Button type='submit' className='gap-2'>
					{isPending && <LoadingSpinner />}Save changes
				</Button>

				{message && <SuccessMessage>{message}</SuccessMessage>}
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</form>
		</section>
	);
};

export default ChangeEmailSetting;
