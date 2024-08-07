'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import confirmEmail from '../_actions/confirm-email';
import ErrorMessage from '@/components/common/error-message';
import SuccessMessage from '@/components/common/success-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ConfirmEmailPage = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');

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
				It is the last step to create your Notecal account
			</p>
			<Button className='mt-4' size='lg' onClick={handleClick}>
				Confirm your email
			</Button>
			<div className='mt-2 flex justify-center'>
				{isPending && <LoadingSpinner />}
			</div>
			{error && <ErrorMessage className='mt-4'>{error}</ErrorMessage>}
			{message && (
				<div className='mt-4 space-y-4'>
					<SuccessMessage>{message}</SuccessMessage>
					<Button
						asChild
						variant='secondary'
						size='lg'
						className='ites-center flex gap-1'>
						<Link href='/auth/login'>
							<ArrowLeft className='h-5 w-5' />
							Or go there now
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default ConfirmEmailPage;
