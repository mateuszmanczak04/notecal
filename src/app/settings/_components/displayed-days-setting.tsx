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
import UpdateDisplayedDaysSchema from '@/schemas/update-displayed-days-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useSettings from '../_hooks/use-settings';

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
	const { update: updateSettings } = useSettings();

	const handleSubmit = (values: z.infer<typeof UpdateDisplayedDaysSchema>) => {
		updateSettings({
			displayedDays: values.displayedDays,
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
					<Button type='submit'>Save</Button>
				</div>
			</form>
		</Form>
	);
};

export default DisplayedDaysSetting;
