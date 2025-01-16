'use client';

import { Input } from '@/components/input';
import { T_Language, useSettings } from '@/hooks/use-settings';

/**
 * A component to update user's local settings
 */
const UpdateSettings = () => {
	const { defaultNoteDuration, setDefaultNoteDuration, language, setLanguage } = useSettings();

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Update your settings</h2>

			<div className='mt-2 flex flex-col gap-4'>
				{/* Default note duration */}
				<div>
					<label htmlFor='update-default-note-duration' className='mb-1 block px-2 font-medium'>
						Default note duration
					</label>
					<Input
						placeholder='60'
						type='number'
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
						id='update-language'
						value={language}
						onChange={e => setLanguage(e.target.value as T_Language)}
					/>
				</div>
			</div>
		</section>
	);
};

export default UpdateSettings;
