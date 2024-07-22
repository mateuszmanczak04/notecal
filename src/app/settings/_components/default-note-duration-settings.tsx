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
import LocalSettings from '@/lib/local-settings';
import { cn } from '@/lib/utils';
import UpdateDefaultNoteDurationSchema from '@/schemas/update-default-note-duration-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import updateSettings from '../_actions/update-settings';

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
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (
		values: z.infer<typeof UpdateDefaultNoteDurationSchema>,
	) => {
		startTransition(async () => {
			await LocalSettings.update({
				defaultNoteDuration: values.defaultNoteDuration,
			});
			await updateSettings({
				defaultNoteDuration: values.defaultNoteDuration,
			});
			// TODO: optimistic updates
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<h2 className='mb-2 text-lg font-semibold'>
					Default note duration (in minutes)
				</h2>
				<div className='grid grid-cols-2 gap-2'>
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
					<Button type='submit' className={cn(isPending && 'opacity-50')}>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default DefaultNoteDurationSetting;
