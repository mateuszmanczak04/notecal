'use client';

import login from '@/app/auth/_actions/login';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
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
import LoginSchema from '@/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginPage = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		startTransition(async () => {
			const res = await login(values);
			if (res?.error) {
				setError(res.error);
			}
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto flex max-w-[400px] flex-col items-center px-8'>
				<p className='text-3xl font-bold'>Login to your account</p>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='mt-4 w-full'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='john.doe@example.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
				<Link
					href={`/auth/forgot-password${form.getValues('email') && `?email=${form.getValues('email')}`}`}
					className='text-neutral mr-auto mt-2 text-sm hover:underline'>
					Forgot password?
				</Link>
				<Button type='submit' className='mt-8 w-full'>
					<LogIn className='h-4 w-4' />
					Login
				</Button>
				<Link
					href='/auth/register'
					className='mt-4 block text-center text-sm text-neutral-500 dark:text-neutral-400'>
					Don&apos;t have an account yet? Register now
				</Link>
				<div className='flex w-full justify-center'>
					{isPending && <LoadingSpinner className='mt-2' />}
				</div>
				{error && (
					<ErrorMessage className='mt-4 w-full'>{error}</ErrorMessage>
				)}
			</form>
		</Form>
	);
};

export default LoginPage;
