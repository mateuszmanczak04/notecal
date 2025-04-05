import { useState, useTransition } from 'react';
import { useSearchParams } from 'react-router';
import { DEFAULT_LOGIN_REDIRECT } from '../../../utils/routes';
import { Button } from '../../button';
import ErrorMessage from '../../error-message';
import { Input } from '../../input';
import LoadingSpinner from '../../loading-spinner';

const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isPending, startTransition] = useTransition();
	const [searchParams] = useSearchParams();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
			})
				.then(res => {
					if (res.ok) {
						const origin = searchParams.get('origin');
						window.location.href = origin || DEFAULT_LOGIN_REDIRECT;
						return;
					}
					return res.json();
				})
				.then(res => {
					if ('error' in res) {
						setError(res.error);
					}
				});
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

			<Button type='submit' className='mt-6 w-full'>
				{isPending && <LoadingSpinner className='h-5 w-5' />}
				Create my account
			</Button>

			{error && <ErrorMessage className='mt-4'>{error}</ErrorMessage>}
		</form>
	);
};

export default RegisterForm;
