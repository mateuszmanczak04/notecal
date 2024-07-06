'use client';

import Link from 'next/link';
import register from '@/app/auth/_actions/register';
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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';

const RegisterPage = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(() =>
			register(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
			}),
		);
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
								<Input placeholder='john.doe@example.com' {...field} />
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
					{isPending && <LoadingSpinner />}
				</div>
				{error && <ErrorMessage className='mt-4 w-full'>{error}</ErrorMessage>}
			</form>
		</Form>
	);
};

export default RegisterPage;
