'use client';

import React, { FC, useEffect, useState, useTransition } from 'react';
import useSettings from '../_hooks/use-settings';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import UpdateDefaultNoteDurationSchema from '@/schemas/update-default-note-duration-schema';
import { z } from 'zod';

import LocalSettings from '@/lib/local-settings';
import { Button } from '@/components/ui/button';
import updateSettings from '../_actions/update-settings';

interface DefaultNoteDurationSettingProps {}

const DefaultNoteDurationSetting: FC<
	DefaultNoteDurationSettingProps
> = ({}) => {
	// Initial value:
	const {
		settings,
		isPending: isSettingsPending,
		error: settingsError,
	} = useSettings();

	const form = useForm<z.infer<typeof UpdateDefaultNoteDurationSchema>>({
		resolver: zodResolver(UpdateDefaultNoteDurationSchema),
		defaultValues: {
			defaultNoteDuration: settings?.defaultNoteDuration || 60,
		},
	});
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (settings) {
			form.setValue('defaultNoteDuration', settings.defaultNoteDuration);
		}
	}, [settings, form]);

	const handleSubmit = (
		values: z.infer<typeof UpdateDefaultNoteDurationSchema>,
	) => {
		startTransition(async () => {
			const res = await updateSettings({
				defaultNoteDuration: values.defaultNoteDuration,
			});
			if (res?.error) return; // TODO: optimistic updates
			await LocalSettings.update({
				defaultNoteDuration: values.defaultNoteDuration,
			});
		});
	};

	if (isSettingsPending || isPending) return <LoadingSpinner />;

	if (settingsError)
		return <ErrorMessage>{settingsError.message}</ErrorMessage>;

	if (!settings) return null;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<h2 className='mb-2 text-lg font-semibold'>
					Default note duration (in minutes)
				</h2>
				<div className='flex gap-2'>
					<FormField
						control={form.control}
						name='defaultNoteDuration'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormControl>
									<Input
										placeholder='60'
										type='number'
										{...field}
										className='w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='flex-1'>
						Save
					</Button>
				</div>
				<div className='flex w-full justify-center'>
					{isPending && (
						<>
							<LoadingSpinner />
						</>
					)}
				</div>
			</form>
		</Form>
	);
};

export default DefaultNoteDurationSetting;
