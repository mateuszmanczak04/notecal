'use client';

import { Input } from '@/components/input';
import { T_Language, useSettings } from '@/hooks/use-settings';

/**
 * A component to update user's local settings
 */
const UpdateSettings = () => {
	const { language, setLanguage } = useSettings();

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Update your settings</h2>

			<div className='mt-2 flex flex-col gap-4'>
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
