'use client';

import React, { useEffect, useTransition } from 'react';
import useSettings from '../_hooks/use-settings';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import LocalSettings from '@/lib/local-settings';
import { Button } from '@/components/ui/button';
import UpdateDisplayedDaysSchema from '@/schemas/update-displayed-days-schema';
import updateSettings from '../_actions/update-settings';

const DisplayedDaysSetting = () => {
	// Initial value:
	const {
		settings,
		isPending: isSettingsPending,
		error: settingsError,
	} = useSettings();

	const form = useForm<z.infer<typeof UpdateDisplayedDaysSchema>>({
		resolver: zodResolver(UpdateDisplayedDaysSchema),
		defaultValues: {
			displayedDays: settings?.displayedDays || 5,
		},
	});
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (settings) {
			console.log(settings);
			form.setValue('displayedDays', settings.displayedDays);
		}
	}, [settings, form]);

	const handleSubmit = (values: z.infer<typeof UpdateDisplayedDaysSchema>) => {
		startTransition(async () => {
			const res = await updateSettings({
				displayedDays: values.displayedDays,
			});
			if (res?.error) return; // TODO: optimistic updates
			await LocalSettings.update({
				displayedDays: values.displayedDays,
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
					Amount of days in week view
				</h2>
				<div className='grid grid-cols-2 gap-2'>
					<FormField
						control={form.control}
						name='displayedDays'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='5'
										type='number'
										{...field}
										className='w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Save</Button>
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

export default DisplayedDaysSetting;
