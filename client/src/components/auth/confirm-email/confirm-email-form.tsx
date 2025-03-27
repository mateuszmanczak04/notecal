import { Mail } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useEmailVerified } from '../../../hooks/use-email-verified';
import { Button } from '../../button';
import ErrorMessage from '../../error-message';
import LoadingSpinner from '../../loading-spinner';
import SuccessMessage from '../../success-message';

const ConfirmEmailForm = () => {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const [searchParams] = useSearchParams();
	const emailVerified = useEmailVerified();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await fetch('/api/auth/email-verified', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: searchParams.get('token') }),
			}).then(res => res.json());
			if ('error' in res) {
				setError(res.error);
			}
			if ('message' in res) {
				setMessage(res.message);
			}
		});
	};

	useEffect(() => {
		if (emailVerified) {
			navigate('/');
		}
	}, [navigate, emailVerified]);

	return (
		<>
			<form onSubmit={handleSubmit} className='mt-4'>
				<Button type='submit' className='w-full' disabled={!!error || !!message}>
					{isPending ? <LoadingSpinner className='h-5 w-5' /> : <Mail className='h-5 w-5' />}
					Confirm
				</Button>
			</form>

			{error && <ErrorMessage>{error}</ErrorMessage>}
			{message && <SuccessMessage>{message}</SuccessMessage>}
		</>
	);
};

export default ConfirmEmailForm;
