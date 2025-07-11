import { Mail } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Button } from '../../button';
import ErrorMessage from '../../error-message';
import { Input } from '../../input';
import LoadingSpinner from '../../loading-spinner';
import SuccessMessage from '../../success-message';

const ForgotPasswordForm = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim().toLowerCase() }),
			}).then(res => res.json());
			if ('error' in res) {
				setError(res.error);
			}
			if ('message' in res) {
				setMessage(res.message);
			}
		});
	};

	return (
		<>
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

				<Button type='submit' className='mt-4 w-full' disabled={!!message}>
					{isPending ? <LoadingSpinner className='h-5 w-5' /> : <Mail className='h-5 w-5' />}
					Send recovery message
				</Button>
			</form>

			{/* Result messages */}
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{message && <SuccessMessage>{message}</SuccessMessage>}
		</>
	);
};

export default ForgotPasswordForm;
