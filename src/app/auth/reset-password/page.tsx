'use client';

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
import ResetPasswordSchema from '@/schemas/reset-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import resetPassword from '../_actions/reset-password';

const ResetPasswordPage = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token') || '';

	const { mutate, error, isPending, data } = useMutation({
		mutationFn: async (values: z.infer<typeof ResetPasswordSchema>) => {
			const { error, message } = await resetPassword(values);
			if (error) {
				throw new Error(error);
			}
			form.reset();
			return { message };
		},
	});
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			token,
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		mutate(values);
	};

	if (!token) {
		return (
			<div className='mx-auto max-w-[480px]'>
				<ErrorMessage>Invalid token</ErrorMessage>
			</div>
		);
	}

	return (
		<div className='mx-auto flex max-w-[480px] flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Reset your password</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input placeholder='******' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm new password</FormLabel>
								<FormControl>
									<Input placeholder='******' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='gap-2'>
						Change password <Pencil className='h-5 w-5' />
					</Button>
					{data && (
						<>
							<SuccessMessage>{data.message}</SuccessMessage>
							<Button asChild variant='secondary' className='gap-1'>
								<Link href='/auth/login'>
									<ArrowLeft className='h-5 w-5' />
									Go back to login page
								</Link>
							</Button>
						</>
					)}
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					{isPending && <LoadingSpinner />}
				</form>
			</Form>
		</div>
	);
};

export default ResetPasswordPage;
