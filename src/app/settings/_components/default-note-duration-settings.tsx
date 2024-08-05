'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UpdateDefaultNoteDurationSchema from '@/schemas/update-default-note-duration-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useSettings from '../_hooks/use-settings';

interface DefaultNoteDurationSettingProps {
	initialDefaultNoteDuration: number;
}

const DefaultNoteDurationSetting: FC<DefaultNoteDurationSettingProps> = ({
	initialDefaultNoteDuration,
}) => {
	const form = useForm<z.infer<typeof UpdateDefaultNoteDurationSchema>>({
		resolver: zodResolver(UpdateDefaultNoteDurationSchema),
		defaultValues: {
			defaultNoteDuration: initialDefaultNoteDuration,
		},
	});
	const { update: updateSettings } = useSettings();

	const handleSubmit = (
		values: z.infer<typeof UpdateDefaultNoteDurationSchema>,
	) => {
		updateSettings({
			defaultNoteDuration: values.defaultNoteDuration,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<h2 className='mb-2 text-lg font-semibold'>
					Default note duration (in minutes)
				</h2>
				<div className='grid gap-2 sm:grid-cols-2'>
					<FormField
						control={form.control}
						name='defaultNoteDuration'
						render={({ field }) => (
							<FormItem>
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
					<Button type='submit'>Save</Button>
				</div>
			</form>
		</Form>
	);
};

export default DefaultNoteDurationSetting;
