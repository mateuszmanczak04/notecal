'use client';

import { Input } from '@/components/input';
import { useSettings } from '@/hooks/use-settings';

const NotesSettings = () => {
	const { autosaveTime, setAutosaveTime } = useSettings();

	return (
		<fieldset className='space-y-2 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
			<legend className='px-2'>Settings</legend>

			{/* Autosave */}
			<div className='flex items-center'>
				<Input
					type='tel'
					id='autosave-time'
					name='autosave-time'
					min='1'
					max='60'
					className='mt-1 w-16 text-center'
					value={autosaveTime}
					onChange={e => setAutosaveTime(parseInt(e.target.value))}
				/>
				<label htmlFor='autosave-time' className='block px-2 font-medium'>
					Autosave time (in minutes)
				</label>
			</div>
		</fieldset>
	);
};

export default NotesSettings;
