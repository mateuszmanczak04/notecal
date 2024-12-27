'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/input';
import { cn } from '@/utils/cn';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import getUser from '../_actions/get-user';
import updateSettings from '../_actions/update-settings';

/**
 * A place to update most of user's settings not related to authentication.
 */
const UpdateSettings = () => {
	const queryClient = useQueryClient();
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { mutate, isPending, error } = useMutation({
		mutationFn: updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	const [displayedDays, setDisplayedDays] = useState(user?.displayedDays);
	const [defaultNoteDuration, setDefaultNoteDuration] = useState(user?.defaultNoteDuration);
	const [language, setLanguage] = useState(user?.language);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ displayedDays, defaultNoteDuration, language });
	};

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Update your settings</h2>

			<form onSubmit={handleSubmit} className={cn('mt-2 flex flex-col gap-4', isPending && 'opacity-50')}>
				{/* Displayed days field */}
				<div>
					<label htmlFor='update-displayed-days' className='mb-1 block px-2 font-medium'>
						Displayed days
					</label>
					<Input
						placeholder='7'
						type='number'
						name='displayedDays'
						id='update-displayed-days'
						value={displayedDays}
						onChange={e => setDisplayedDays(parseInt(e.target.value))}
					/>
				</div>

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
