'use client';

import sendConfirmationEmail from '@/app/auth/_actions/send-confirmation-email';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { FC, useState, useTransition } from 'react';

interface EmailNotConfirmedProps {}

const EmailNotConfirmed: FC<EmailNotConfirmedProps> = ({}) => {
	const session = useSession();
	const [isPending, startTransition] = useTransition();
	const email = session?.data?.user?.email;
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	if (!email) return null;

	const handleResendLink = () => {
		setError('');
		setMessage('');

		startTransition(async () => {
			const res = await sendConfirmationEmail({ email });
			if (res.error) {
				setError(res.error);
				return;
			}
			if (res.success) {
				setMessage('Email sent successfully, check your inbox now');
			}
		});
	};

	return (
		<div className='rounded-xl border-2 border-orange-300 bg-orange-100 p-4'>
			<p>Your email is not confirmed</p>
			<small className='font-bold opacity-50'>({email})</small>
			<p className='mt-4 opacity-50'>
				Confirm your email to secure your account in case you lose your password
			</p>
			<Button
				variant='link'
				onClick={handleResendLink}
				className='mt-2 block p-0 text-inherit underline hover:opacity-75'>
				Resend confirmation link
			</Button>
			{error && <ErrorMessage className='mt-2'>{error}</ErrorMessage>}
			{message && <SuccessMessage className='mt-2'>{message}</SuccessMessage>}
			{isPending && <LoadingSpinner className='mt-2' />}
		</div>
	);
};

export default EmailNotConfirmed;
