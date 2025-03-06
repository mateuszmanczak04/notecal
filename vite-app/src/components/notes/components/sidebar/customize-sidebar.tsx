import { Checkbox } from '../../../../components/checkbox';
import { useSettings } from '../../../../hooks/use-settings';

/** Component where user specifies what they want to see in the /notes page sidebar */
const CustomizeSidebar = () => {
	const { sidebarElements, setSidebarElements } = useSettings();

	const handleToggle = (property: keyof typeof sidebarElements, value: boolean) => {
		setSidebarElements(old => ({ ...old, [property]: value }));
	};

	return (
		<div className='p-6'>
			<p className='font-semibold'>Customize sidebar</p>
			<p className='mt-2 text-sm opacity-75'>
				You can choose which elements of this sidebar should be visible for you
			</p>
			<ul className='mt-4 grid gap-2'>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-course-related'
						checked={sidebarElements.courseRelated}
						onCheckedChange={value => handleToggle('courseRelated', value === true)}
					/>
					<label htmlFor='show-course-related' className='flex-1 cursor-pointer pl-2'>
						Course related
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-notes-list'
						checked={sidebarElements.notesList}
						onCheckedChange={value => handleToggle('notesList', value === true)}
					/>
					<label htmlFor='show-notes-list' className='flex-1 cursor-pointer pl-2'>
						Notes list
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-useful-links'
						checked={sidebarElements.usefulLinks}
						onCheckedChange={value => handleToggle('usefulLinks', value === true)}
					/>
					<label htmlFor='show-useful-links' className='flex-1 cursor-pointer pl-2'>
						Useful links
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-tasks'
						checked={sidebarElements.tasks}
						onCheckedChange={value => handleToggle('tasks', value === true)}
					/>
					<label htmlFor='show-tasks' className='flex-1 cursor-pointer pl-2'>
						Tasks
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-note-related'
						checked={sidebarElements.noteRelated}
						onCheckedChange={value => handleToggle('noteRelated', value === true)}
					/>
					<label htmlFor='show-note-related' className='flex-1 cursor-pointer pl-2'>
						Note related
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-settings'
						checked={sidebarElements.settings}
						onCheckedChange={value => handleToggle('settings', value === true)}
					/>
					<label htmlFor='show-settings' className='flex-1 cursor-pointer pl-2'>
						Settings
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox
						className='size-5 data-[state=checked]:bg-neutral-700 dark:data-[state=checked]:bg-neutral-700'
						id='show-danger-zone'
						checked={sidebarElements.dangerZone}
						onCheckedChange={value => handleToggle('dangerZone', value === true)}
					/>
					<label htmlFor='show-danger-zone' className='flex-1 cursor-pointer pl-2'>
						Danger zone
					</label>
				</li>
			</ul>
		</div>
	);
};

export default CustomizeSidebar;
