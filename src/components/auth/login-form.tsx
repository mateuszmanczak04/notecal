'use client';

import login from '@/actions/login';
import { Alert, AlertTitle } from '@/components/ui/alert';
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
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { z } from 'zod';

const LoginForm = () => {
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
		startTransition(() =>
			login(values).then(res => {
				if (res?.error) {
					setError(res.error);
				}
			}),
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
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
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder='******' {...field} type='password' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Login
				</Button>
				<div className='flex w-full justify-center'>
					{isPending && <ClipLoader className='mx-auto' />}
				</div>
				{error && (
					<Alert variant='destructive'>
						<AlertTitle className='mb-0'>{error}</AlertTitle>
					</Alert>
				)}
			</form>
		</Form>
	);
};

export default LoginForm;