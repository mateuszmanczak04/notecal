'use client';

import { Checkbox } from '@/components/checkbox';
import { useSettings } from '@/hooks/use-settings';

const CustomizeSidebar = () => {
	const { sidebarElements, setSidebarElements } = useSettings();

	const handleToggle = (property: keyof typeof sidebarElements, value: boolean) => {
		setSidebarElements(old => ({ ...old, [property]: value }));
	};

	return (
		<fieldset className='space-y-2 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
			<legend className='px-2'>Customize sidebar</legend>
			<ul className='grid gap-2 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2'>
				<li className='flex select-none items-center'>
					<Checkbox
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
						id='show-danger-zone'
						checked={sidebarElements.dangerZone}
						onCheckedChange={value => handleToggle('dangerZone', value === true)}
					/>
					<label htmlFor='show-danger-zone' className='flex-1 cursor-pointer pl-2'>
						Danger zone
					</label>
				</li>
			</ul>
		</fieldset>
	);
};

export default CustomizeSidebar;
