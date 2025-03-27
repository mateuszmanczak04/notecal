import { useSettings } from '../../../../hooks/use-settings';
import { Checkbox } from '../../../checkbox';
import { Input } from '../../../input';

const NotesSettings = () => {
	const {
		noteAutoSave,
		setNoteAutoSave,
		defaultNoteDuration,
		setDefaultNoteDuration,
		maxNoteWidthEnabled,
		setMaxNoteWidthEnabled,
	} = useSettings();

	return (
		<div className='border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<p className='font-semibold'>Settings</p>
			<p className='mt-2 text-sm opacity-75'>
				Note that these settings are reflected in all your notes, not only for this course
			</p>

			{/* Autosave */}
			<div className='mt-6 flex select-none items-center'>
				<Checkbox
					id='autosave-time'
					name='autosave-time'
					checked={noteAutoSave}
					className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
					onCheckedChange={value => setNoteAutoSave(value === true)}
				/>
				<label htmlFor='autosave-time' className='block flex-1 pl-2 text-sm font-medium'>
					Auto save content (every 30s)
				</label>
			</div>

			{/* Max width of content */}
			<div className='mt-6 flex select-none items-center'>
				<Checkbox
					id='limit-content-width'
					name='limit-content-width'
					checked={maxNoteWidthEnabled}
					className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
					onCheckedChange={value => setMaxNoteWidthEnabled(value === true)}
				/>
				<label htmlFor='limit-content-width' className='block flex-1 pl-2 text-sm font-medium'>
					Limit content width
				</label>
			</div>

			{/* Default note duration */}
			<div className='mt-6 select-none'>
				<label htmlFor='default-note-duration' className='block px-1 text-sm font-medium'>
					Default new note duration (in minutes)
				</label>
				<Input
					className='mt-2 w-20'
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
