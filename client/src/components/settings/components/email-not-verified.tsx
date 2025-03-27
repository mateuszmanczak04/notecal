import { Mail } from 'lucide-react';
import { useActionState } from 'react';
import { useEmailVerified } from '../../../hooks/use-email-verified';
import { useUser } from '../../../hooks/use-user';
import { Button } from '../../button';
import ErrorMessage from '../../error-message';
import LoadingSpinner from '../../loading-spinner';
import SuccessMessage from '../../success-message';

const EmailNotVerified = () => {
	const { data: user } = useUser();
	const emailVerified = useEmailVerified();
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

	// Don't want to show this component when user has email verified
	if (emailVerified) return;

	return (
		<div className='border-error-500 space-y-4 rounded-xl border-2 p-4 dark:text-white'>
			<p>
				Your email <strong>{user?.email}</strong> is not verified
			</p>
			<p className='opacity-75'>Confirm your email to secure your account in case you lose your password</p>

			<form action={formAction}>
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
