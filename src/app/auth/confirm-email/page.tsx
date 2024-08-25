'use client';

import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import confirmEmail from '../_actions/confirm-email';

const ConfirmEmailPage = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');
	const newAccount = searchParams.get('newAccount') === 'true';

	const handleClick = () => {
		setError('');
		setMessage('');

		if (!token) {
			setError('Missing token');
			return;
		}

		startTransition(async () => {
			const res = await confirmEmail({ token });
			if (res.error) {
				setError(res.error);
				return;
			}
			if (res.success) {
				setMessage(
					'Email confirmed successfully, you will be redirected to login page within 5 seconds',
				);
				setTimeout(() => {
					router.push('/auth/login');
				}, 5000);
			}
		});
	};

	return (
		<div className='mx-auto max-w-[480px] px-8'>
			<h1 className='text-3xl font-bold'>Confirm Your email address</h1>
			<p className='mt-2 text-xl'>
				{newAccount
					? 'It is the last step to create your Notecal account'
					: 'It is the last step to update your account email'}
			</p>
			<Button className='mt-4' onClick={handleClick}>
				<Mail />
				Confirm your email
			</Button>
			<div className='mt-2 flex justify-center'>
				{isPending && <LoadingSpinner />}
			</div>
			{error && <ErrorMessage className='mt-4'>{error}</ErrorMessage>}
			{message && (
				<div className='mt-4 space-y-4'>
					<SuccessMessage>{message}</SuccessMessage>
					<Button asChild variant='secondary'>
						<Link href='/auth/login'>
							<ArrowLeft />
							Or go there now
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default ConfirmEmailPage;
