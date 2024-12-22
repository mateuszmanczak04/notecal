'use client';

import ErrorMessage from '@/components/common/error-message';
import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState, useState } from 'react';
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
	const [state, formAction] = useActionState(updateSettings, { message: '' });

	// Required to make inputs controlled and avoid stale value to appear
	const [displayedDays, setDisplayedDays] = useState(initialDisplayedDays.toString());
	const [defaultNoteDuration, setDefaultNoteDuration] = useState(initialDefaultNoteDuration.toString());
	const [language, setLanguage] = useState(initialLanguage);

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Update your settings</h2>

			<form action={formAction} className='mt-2 flex flex-col gap-4'>
				{/* Displayed days field */}
				<div>
					<label htmlFor='update-displayed-days' className='mb-1 block px-2 font-medium'>
						Displayed days
					</label>
					<Input
						placeholder='7'
						type='text'
						name='displayedDays'
						id='update-displayed-days'
						value={displayedDays}
						onChange={e => setDisplayedDays(e.target.value)}
					/>
				</div>

				{/* Default note duration */}
				<div>
					<label htmlFor='update-default-note-duration' className='mb-1 block px-2 font-medium'>
						Default note duration
					</label>
					<Input
						placeholder='60'
						type='text'
						name='defaultNoteDuration'
						id='update-default-note-duration'
						value={defaultNoteDuration}
						onChange={e => setDefaultNoteDuration(e.target.value)}
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
				{state.message && <SuccessMessage>{state.message}</SuccessMessage>}
				{state.error && <ErrorMessage>{state.error}</ErrorMessage>}

				<FormLoadingSpinner />
			</form>
		</section>
	);
};

export default UpdateSettings;
