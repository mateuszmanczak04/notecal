'use client';

import { Checkbox } from '@/components/checkbox';
import { Input } from '@/components/input';
import { useSettings } from '@/hooks/use-settings';

const NotesSettings = () => {
	const { noteAutoSave, setNoteAutoSave, defaultNoteDuration, setDefaultNoteDuration } = useSettings();

	return (
		<div className='border-b border-neutral-200 pb-4 dark:border-neutral-700'>
			<p className='px-2 font-semibold'>Settings</p>
			<p className='mt-2 text-balance px-2 text-sm opacity-75'>
				Note that these settings are reflected in all your notes, not only for this course
			</p>

			{/* Autosave */}
			<div className='mt-6 flex select-none items-center px-2'>
				<Checkbox
					id='autosave-time'
					name='autosave-time'
					checked={noteAutoSave}
					onCheckedChange={value => setNoteAutoSave(value === true)}
				/>
				<label htmlFor='autosave-time' className='block flex-1 cursor-pointer pl-2 font-medium'>
					Auto save content (every 30s)
				</label>
			</div>

			{/* Default note duration */}
			<div className='mt-6 select-none'>
				<label htmlFor='default-note-duration' className='mb-1 block px-2 font-medium '>
					Default new note duration (min)
				</label>
				<Input
					placeholder='60'
					type='tel'
					id='default-note-duration'
					value={defaultNoteDuration}
					onChange={e => setDefaultNoteDuration(parseInt(e.target.value) || 0)}
				/>
			</div>
		</div>
	);
};

export default NotesSettings;
