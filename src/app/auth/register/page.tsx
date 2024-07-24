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
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto flex max-w-[400px] flex-col items-center'>
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
										<Input placeholder='******' {...field} type='password' />
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
										<Input placeholder='******' {...field} type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='mt-8 w-full'>
							Register
						</Button>
						<Link
							href='/auth/login'
							className='mt-4 block text-center text-sm text-gray-500'>
							Already have an account? Log in
						</Link>
						<div className='flex w-full justify-center'>
							{isPending && <LoadingSpinner className='mt-2' />}
						</div>
						{error && (
							<ErrorMessage className='mt-4 w-full'>{error}</ErrorMessage>
						)}
					</>
				) : (
					<SuccessMessage className='mt-4 w-full'>{message}</SuccessMessage>
				)}
			</form>
		</Form>
	);
};

export default RegisterPage;
