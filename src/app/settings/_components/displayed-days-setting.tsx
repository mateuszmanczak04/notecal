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
import UpdateDisplayedDaysSchema from '@/schemas/update-displayed-days-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import updateSettings from '../_actions/update-settings';
import { cn } from '@/lib/utils';

type Props = {
	initialDisplayedDays: number;
};

const DisplayedDaysSetting = ({ initialDisplayedDays }: Props) => {
	const form = useForm<z.infer<typeof UpdateDisplayedDaysSchema>>({
		resolver: zodResolver(UpdateDisplayedDaysSchema),
		defaultValues: {
			displayedDays: initialDisplayedDays,
		},
	});
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (values: z.infer<typeof UpdateDisplayedDaysSchema>) => {
		startTransition(async () => {
			await LocalSettings.update({
				displayedDays: values.displayedDays,
			});
			await updateSettings({
				displayedDays: values.displayedDays,
			});
			// TODO: optimistic updates
		});
	};

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
					<Button type='submit' className={cn(isPending && 'opacity-50')}>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default DisplayedDaysSetting;
