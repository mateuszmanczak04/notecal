'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { cn } from '@/utils/cn';
import { FormEvent, useState, useTransition } from 'react';

const UpdateSettings = () => {
	const [isPending, startTransition] = useTransition();
	// const [error, setError] = useState<string>('');
	// const [message, setMessage] = useState<string>('');
	const { settings, updateSettings } = useAppContext();

	const [displayedDays, setDisplayedDays] = useState(settings.displayedDays);
	const [defaultNoteDuration, setDefaultNoteDuration] = useState(settings.defaultNoteDuration);
	const [language, setLanguage] = useState(settings.language);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			await updateSettings({ displayedDays, defaultNoteDuration, language });
			// TODO: handle errors
		});
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
				{/* {message && <SuccessMessage>{message}</SuccessMessage>}
				{error && <ErrorMessage>{error}</ErrorMessage>} */}
			</form>
		</section>
	);
};

export default UpdateSettings;
