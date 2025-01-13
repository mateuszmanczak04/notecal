'use client';

import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/utils/cn';
import { toUTC } from '@/utils/timezone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import updateSettings from '../_actions/update-settings';

/**
 * A place to update most of user's settings not related to authentication.
 */
const UpdateSettings = () => {
	const queryClient = useQueryClient();
	const { data: user } = useUser();
	const { toast } = useToast();
	const { mutate, isPending, error } = useMutation({
		mutationFn: updateSettings,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	const [defaultNoteDuration, setDefaultNoteDuration] = useState(user?.defaultNoteDuration);
	const [language, setLanguage] = useState(user?.language);
	const [firstCalendarDay, setFirstCalendarDay] = useState<Date | null>(user?.firstCalendarDay || null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ defaultNoteDuration, language, firstCalendarDay });
	};

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Update your settings</h2>

			<form onSubmit={handleSubmit} className={cn('mt-2 flex flex-col gap-4', isPending && 'opacity-50')}>
				{/* Default note duration */}
				<div>
					<label htmlFor='update-default-note-duration' className='mb-1 block px-2 font-medium'>
						Default note duration
					</label>
					<Input
						placeholder='60'
						type='number'
						name='defaultNoteDuration'
						id='update-default-note-duration'
						value={defaultNoteDuration}
						onChange={e => setDefaultNoteDuration(parseInt(e.target.value))}
					/>
				</div>

				{/* Language */}
				<div>
					<label htmlFor='update-language' className='mb-1 block px-2 font-medium'>
						Language
					</label>
					<Input
						placeholder='en'
						type='text'
						name='language'
						id='update-language'
						value={language}
						onChange={e => setLanguage(e.target.value)}
					/>
				</div>

				<div className=' mt-2 flex items-center gap-1'>
					<Checkbox
						checked={!!firstCalendarDay}
						id='first-calendar-day'
						className='rounded-md'
						onCheckedChange={checked => setFirstCalendarDay(checked ? toUTC(new Date()) : null)}
					/>
					<label htmlFor='first-calendar-day' className='mb-1 block cursor-pointer px-2 font-medium'>
						Synchronize calendar timespan between devices
					</label>
				</div>

				{/* Submit button */}
				<Button type='submit' className='gap-2'>
					Save changes
				</Button>

				{/* Form results */}
				{error && <ErrorMessage>{error.message}</ErrorMessage>}
			</form>
		</section>
	);
};

export default UpdateSettings;
