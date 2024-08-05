'use client';

import changePassword from '@/app/settings/_actions/change-password';
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
import ChangePasswordSchema from '@/schemas/change-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
		<div className='flex flex-col gap-2'>
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
					<Button type='submit' className='gap-2'>
						Change password <Pencil className='h-5 w-5' />
					</Button>
					{data && <SuccessMessage>{data.message}</SuccessMessage>}
					{error && <ErrorMessage>{error.message}</ErrorMessage>}
					{isPending && <LoadingSpinner />}
				</form>
			</Form>
		</div>
	);
};

export default ChangePasswordSetting;
