'use client';

import register from '@/app/auth/_actions/register';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RegisterSchema from '@/schemas/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import sendConfirmationEmail from '../_actions/send-confirmation-email';

const RegisterPage = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const [isEmailSent, setIsEmailSent] = useState(false);

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(async () => {
			setError('');
			setMessage('');

			const res = await register(values);
			if (res?.error) {
				setError(res.error);
				return;
			}
			if (res?.message) {
				setIsEmailSent(true);
				setMessage(res.message);
			}
		});
	};

	const handleResendEmail = () => {
		const email = form.getValues('email');
		if (!email) {
			setError('Something went wrong, try refreshing page and try again');
			return;
		}

		startTransition(async () => {
			await sendConfirmationEmail({ email });
		});
	};

	if (isPending)
		return (
			<div className='flex w-full justify-center'>
				<LoadingSpinner className='mt-2' />
			</div>
		);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto flex max-w-[400px] flex-col items-center px-8'>
				<p className='text-3xl font-bold'>Create an account</p>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='mt-4 w-full'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={isEmailSent}
									placeholder='john.doe@example.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{!isEmailSent ? (
					<>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='mt-4 w-full'>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='******'
											{...field}
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem className='mt-4 w-full'>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='******'
											{...field}
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='mt-8 w-full'>
							<LogIn className='h-4 w-4' /> Register
						</Button>
						<Link
							href='/auth/login'
							className='mt-4 block text-center text-sm text-neutral-500 dark:text-neutral-400'>
							Already have an account? Log in
						</Link>
						{error && (
							<ErrorMessage className='mt-4 w-full'>
								{error}
							</ErrorMessage>
						)}
					</>
				) : (
					<>
						<SuccessMessage className='mt-4 w-full'>
							{message}
						</SuccessMessage>
						<Button
							variant='secondary'
							className='mt-2 w-full'
							onClick={handleResendEmail}>
							Didn&apos;t get an email? Click here
						</Button>
					</>
				)}
			</form>
		</Form>
	);
};

export default RegisterPage;
