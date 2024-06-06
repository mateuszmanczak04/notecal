'use client';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangePasswordSchema from '@/schemas/change-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import changePassword from '@/actions/auth/change-password';
import LoadingSpinner from '@/components/loading-spinner';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from '@/components/error-message';
import SuccessMessage from '@/components/success-message';
import { Card } from '@/components/ui/card';

const ChangePasswordSetting = () => {
	const { mutate, error, isPending, data } = useMutation({
		mutationFn: async (values: z.infer<typeof ChangePasswordSchema>) => {
			const { error, message } = await changePassword(values);
			if (error) {
				throw new Error(error);
			}
			return { message };
		},
	});
	const form = useForm<z.infer<typeof ChangePasswordSchema>>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
		mutate(values);
	};

	return (
		<Card className='flex flex-col gap-2 p-4 shadow-none md:p-6'>
			<h2 className='text-lg font-semibold'>Change password</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='oldPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Old password</FormLabel>
								<FormControl>
									<Input placeholder='******' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='newPassword'
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
						name='confirmNewPassword'
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
					<Button type='submit'>Submit</Button>
					{data && <SuccessMessage>{data.message}</SuccessMessage>}
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					{isPending && <LoadingSpinner />}
				</form>
			</Form>
		</Card>
	);
};

export default ChangePasswordSetting;
