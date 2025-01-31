'use client';

import { Checkbox } from '@/components/checkbox';
import { useSettings } from '@/hooks/use-settings';

const NotesSettings = () => {
	const { noteAutoSave, setNoteAutoSave } = useSettings();

	return (
		<fieldset className='space-y-2 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
			<legend className='px-2'>Settings</legend>

			{/* Autosave */}
			<div className='flex select-none items-center'>
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
		</fieldset>
	);
};

export default NotesSettings;
