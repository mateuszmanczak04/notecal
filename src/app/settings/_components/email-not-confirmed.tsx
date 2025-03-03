'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import SuccessMessage from '@/components/success-message';
import { useClientSide } from '@/hooks/use-client-side';
import { useUser } from '@/hooks/use-user';
import { Mail } from 'lucide-react';
import { useActionState } from 'react';

const EmailNotConfirmed = () => {
	const { data: user } = useUser();
	const [state, formAction, isPending] = useActionState(
		async () =>
			fetch('/api/auth/email-verified', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: user?.email.trim().toLowerCase() }),
			}).then(res => res.json()),
		{ error: '', message: '' },
	);
	const isClient = useClientSide();

	if (!isClient || !user) return null;

	// Don't want to show this component when user has email verified
	if (user.emailVerified) return;

	return (
		<div className='space-y-4 rounded-xl border-2 border-error-500 p-4 dark:text-white'>
			<p>
				Your email <strong>{user.email}</strong> is not confirmed
			</p>
			<p className=' opacity-75'>Confirm your email to secure your account in case you lose your password</p>

			{/* Main form */}
			<form action={formAction}>
				<input type='hidden' name='email' value={user.email} />
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
