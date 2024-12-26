'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Input } from '@/components/input';
import SuccessMessage from '@/components/success-message';
import { cn } from '@/utils/cn';
import { FormEvent, useState, useTransition } from 'react';
import updateSettings from '../_actions/update-settings';

type Props = {
	displayedDays: number;
	defaultNoteDuration: number;
	language: string;
};

const UpdateSettings = ({
	displayedDays: initialDisplayedDays,
	defaultNoteDuration: initialDefaultNoteDuration,
	language: initialLanguage,
}: Props) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>('');
	const [message, setMessage] = useState<string>('');

	const [displayedDays, setDisplayedDays] = useState(initialDisplayedDays);
	const [defaultNoteDuration, setDefaultNoteDuration] = useState(initialDefaultNoteDuration);
	const [language, setLanguage] = useState(initialLanguage);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await updateSettings({ displayedDays, defaultNoteDuration, language });
			if ('error' in res) {
				setError(res.error);
			} else {
				setMessage(res.message);
			}
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
				{message && <SuccessMessage>{message}</SuccessMessage>}
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</form>
		</section>
	);
};

export default UpdateSettings;
