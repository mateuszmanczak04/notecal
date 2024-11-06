'use client';

import logout from '@/app/auth/_actions/logout';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ChangeEmailSchema from '@/schemas/change-email-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import changeEmail from '../_actions/change-email';

const ChangeEmailSetting = () => {
	const session = useSession();
	const { mutate, error, isPending, data } = useMutation({
		mutationFn: async (values: z.infer<typeof ChangeEmailSchema>) => {
			const { error, message } = await changeEmail(values);
			if (error) {
				throw new Error(error);
			}
			await logout();
			return { message };
		},
	});

	const form = useForm<z.infer<typeof ChangeEmailSchema>>({
		resolver: zodResolver(ChangeEmailSchema),
		defaultValues: {
			password: '',
			email: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ChangeEmailSchema>) => {
		mutate(values);
	};

	return (
		<div className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your email address</h2>
			<p className='opacity-75'>({session.data?.user?.email})</p>
			<p className='opacity-75'>You will have to log in again afterwards</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					{/* Email field */}
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New email</FormLabel>
								<FormControl>
									<Input placeholder='example@abc.com' type='email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password field */}
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Your password</FormLabel>
								<FormControl>
									<Input placeholder='******' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Button and results */}
					<Button type='submit' className='gap-2'>
						Save
					</Button>
					{data && <SuccessMessage>{data.message}</SuccessMessage>}
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					{isPending && <LoadingSpinner />}
				</form>
			</Form>
		</div>
	);
};

export default ChangeEmailSetting;
