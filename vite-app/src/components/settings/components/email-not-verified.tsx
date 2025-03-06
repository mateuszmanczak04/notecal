'use client';

import { Mail } from 'lucide-react';
import { useActionState } from 'react';
import { Button } from '../../../components/button';
import ErrorMessage from '../../../components/error-message';
import LoadingSpinner from '../../../components/loading-spinner';
import SuccessMessage from '../../../components/success-message';
import { useClientSide } from '../../../hooks/use-client-side';
import { useUser } from '../../../hooks/use-user';

const EmailNotVerified = () => {
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
		<div className='border-error-500 space-y-4 rounded-xl border-2 p-4 dark:text-white'>
			<p>
				Your email <strong>{user.email}</strong> is not verified
			</p>
			<p className='opacity-75'>Confirm your email to secure your account in case you lose your password</p>

			<form action={formAction}>
				<input type='hidden' name='email' value={user.email} />
				<Button type='submit'>
					{isPending ? <LoadingSpinner /> : <Mail />}
					Resend verification link
				</Button>
			</form>

			{state.error && <ErrorMessage className='mt-2'>{state.error}</ErrorMessage>}
			{state.message && <SuccessMessage className='mt-2'>{state.message}</SuccessMessage>}
		</div>
	);
};

export default EmailNotVerified;
