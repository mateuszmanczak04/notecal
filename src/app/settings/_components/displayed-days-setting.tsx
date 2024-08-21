'use client';

import DropdownMenu, {
	DropdownMenuValueType,
} from '@/components/common/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
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

	const options = [
		{
			value: 1,
			label: '1',
		},
		{
			value: 2,
			label: '2',
		},
		{
			value: 3,
			label: '3',
		},
		{
			value: 4,
			label: '4',
		},
		{
			value: 5,
			label: '5',
		},
		{
			value: 6,
			label: '6',
		},
		{
			value: 7,
			label: '7',
		},
	];

	const currentOption = {
		value: initialDisplayedDays,
		label: initialDisplayedDays.toString(),
	};

	const handleChange = (value: DropdownMenuValueType) => {
		updateSettings({ displayedDays: value as number });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<h2 className='mb-2 text-lg font-semibold'>
					Amount of days in week view
				</h2>
				<div className='grid gap-2 sm:grid-cols-2'>
					<FormField
						control={form.control}
						name='displayedDays'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									{/* <Input
										placeholder='5'
										type='number'
										{...field}
										className='w-full'
									/> */}
									<DropdownMenu
										options={options}
										currentOption={currentOption}
										onChange={handleChange}
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
