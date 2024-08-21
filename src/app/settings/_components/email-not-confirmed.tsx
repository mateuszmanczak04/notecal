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
		<div className='space-y-4 rounded-xl border-2 border-red-500 bg-neutral-100 p-4 dark:bg-neutral-700 dark:text-white'>
			<p>Your email ({email}) is not confirmed</p>
			<p className=' opacity-75'>
				Confirm your email to secure your account in case you lose your
				password
			</p>
			<Button onClick={handleResendLink}>Resend confirmation link</Button>
			{error && <ErrorMessage className='mt-2'>{error}</ErrorMessage>}
			{message && (
				<SuccessMessage className='mt-2'>{message}</SuccessMessage>
			)}
			{isPending && <LoadingSpinner className='mt-2' />}
		</div>
	);
};

export default EmailNotConfirmed;
