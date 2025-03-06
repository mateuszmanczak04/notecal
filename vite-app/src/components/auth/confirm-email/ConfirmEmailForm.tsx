'use client';

import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useUser } from '@/hooks/use-user';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

const ConfirmEmailForm = () => {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const { data: user } = useUser();
	const router = useRouter();

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
			router.replace(DEFAULT_LOGIN_REDIRECT);
		}
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit} className='mt-4 '>
				<Button type='submit' className='w-full' disabled={!!error || !!message}>
					{isPending ? <LoadingSpinner className='h-5 w-5' /> : <Mail className='h-5 w-5' />}
					Confirm
				</Button>
			</form>

			{error && <p className='mx-4 mt-4 text-error-600 dark:text-error-400'>{error}</p>}
			{message && <p className='mx-4 mt-4 text-success-600 dark:text-success-400'>{message}</p>}
		</>
	);
};

export default ConfirmEmailForm;
