import { useState, useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import LoadingSpinner from '../../../components/loading-spinner';
import { BACKEND_DOMAIN } from '../../../utils/app-domain';

const ResetPasswordForm = () => {
	const [error, setError] = useState('');
	const [isPending, startTransition] = useTransition();
	const [password, setPassword] = useState('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await fetch(`${BACKEND_DOMAIN}/api/auth/reset-password`, {
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
				navigate('/calendar');
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

			{error && <p className='text-error-600 dark:text-error-400 mx-4 mt-4'>{error}</p>}
		</>
	);
};

export default ResetPasswordForm;
