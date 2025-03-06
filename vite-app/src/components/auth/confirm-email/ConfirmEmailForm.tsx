import { Mail } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '../../../components/button';
import LoadingSpinner from '../../../components/loading-spinner';
import { useUser } from '../../../hooks/use-user';

const ConfirmEmailForm = () => {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const [searchParams] = useSearchParams();
	const { data: user } = useUser();
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
		if (user?.emailVerified) {
			navigate('/');
		}
	}, [navigate, user?.emailVerified]);

	return (
		<>
			<form onSubmit={handleSubmit} className='mt-4'>
				<Button type='submit' className='w-full' disabled={!!error || !!message}>
					{isPending ? <LoadingSpinner className='h-5 w-5' /> : <Mail className='h-5 w-5' />}
					Confirm
				</Button>
			</form>

			{error && <p className='text-error-600 dark:text-error-400 mx-4 mt-4'>{error}</p>}
			{message && <p className='text-success-600 dark:text-success-400 mx-4 mt-4'>{message}</p>}
		</>
	);
};

export default ConfirmEmailForm;
