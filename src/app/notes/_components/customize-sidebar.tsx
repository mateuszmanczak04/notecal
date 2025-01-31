'use client';

import { Checkbox } from '@/components/checkbox';

const CustomizeSidebar = () => {
	return (
		<fieldset className='space-y-2 rounded-xl border border-neutral-200 p-4 pt-0 dark:border-neutral-700'>
			<legend className='px-2'>Customize sidebar</legend>
			<ul className='grid gap-2 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2'>
				<li className='flex select-none items-center'>
					<Checkbox id='show-course-related' />
					<label htmlFor='show-course-related' className='flex-1 cursor-pointer pl-2'>
						Course related
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox id='show-notes-list' />
					<label htmlFor='show-notes-list' className='flex-1 cursor-pointer pl-2'>
						Notes list
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox id='show-useful-links' />
					<label htmlFor='show-useful-links' className='flex-1 cursor-pointer pl-2'>
						Useful links
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox id='show-tasks' />
					<label htmlFor='show-tasks' className='flex-1 cursor-pointer pl-2'>
						Tasks
					</label>
				</li>
				<li className='flex select-none items-center'>
					<Checkbox id='show-danger-zone' />
					<label htmlFor='show-danger-zone' className='flex-1 cursor-pointer pl-2'>
						Danger zone
					</label>
				</li>
			</ul>
		</fieldset>
	);
};

export default CustomizeSidebar;
