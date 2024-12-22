'use client';

import { sendConfirmationEmailForm } from '@/app/auth/_actions/send-confirmation-email';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useActionState } from 'react';

type Props = {
	emailConfirmed: boolean;
	email: string;
};

const EmailNotConfirmed = ({ emailConfirmed, email }: Props) => {
	const [state, formAction, isPending] = useActionState(sendConfirmationEmailForm, { error: '' });

	// Don't want to show this component when user has email verified
	if (emailConfirmed) return;

	return (
		<div className='space-y-4 rounded-xl border-2 border-error-500 p-4 dark:text-white'>
			<p>
				Your email <strong>{email}</strong> is not confirmed
			</p>
			<p className=' opacity-75'>Confirm your email to secure your account in case you lose your password</p>

			{/* Main form */}
			<form action={formAction}>
				<input type='hidden' name='email' value={email} />
				<Button type='submit'>
					<Mail />
					Resend confirmation link
				</Button>
			</form>

			{/* Result */}
			{state.error && <ErrorMessage className='mt-2'>{state.error}</ErrorMessage>}
			{state.message && <SuccessMessage className='mt-2'>{state.message}</SuccessMessage>}
			{isPending && <LoadingSpinner className='mt-2' />}
		</div>
	);
};

export default EmailNotConfirmed;
