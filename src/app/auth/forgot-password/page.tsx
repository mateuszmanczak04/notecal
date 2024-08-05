'use client';

import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import forgotPassword from '../_actions/forgot-password';

const ForgotPasswordPage = () => {
	const searchParams = useSearchParams();
	const [email, setEmail] = useState<string>(
		(searchParams.get('email') as string) || '',
	);
	const [timeToNextAttempt, setTimeToNextAttempt] = useState(0);

	const startCounter = () => {
		let timeLeft = 30;
		setTimeToNextAttempt(timeLeft);

		const repeat = () => {
			setTimeout(() => {
				if (timeLeft === 0) return;
				timeLeft -= 1;
				setTimeToNextAttempt(timeLeft);
				repeat();
			}, 1000);
		};

		repeat();
	};

	const { data, error, isPending, mutate } = useMutation({
		mutationFn: async () => {
			const { message, error } = await forgotPassword(email);
			if (error) {
				throw new Error(error);
			}
			return { message };
		},
		onSuccess: startCounter,
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (email.length === 0) return;
		mutate();
	};

	return (
		<form
			className='mx-auto flex max-w-[400px] flex-col gap-4'
			onSubmit={handleSubmit}>
			<div>
				<label htmlFor='reset-password-input`'>
					<span className='font-medium'>Reset your password</span>
				</label>
				<Input
					id='reset-password-input'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='mt-2'
				/>
			</div>
			<Button disabled={isPending || timeToNextAttempt !== 0}>
				Send recovery email
			</Button>
			<small>
				Please note that email will be sent only if you have confirmed your
				email address previously
			</small>
			{timeToNextAttempt !== 0 && (
				<p>Wait {timeToNextAttempt} seconds until you send the email again</p>
			)}
			{isPending && <LoadingSpinner />}
			{error && <ErrorMessage>{error.message}</ErrorMessage>}
			{data?.message && <SuccessMessage>{data.message}</SuccessMessage>}
		</form>
	);
};

export default ForgotPasswordPage;
