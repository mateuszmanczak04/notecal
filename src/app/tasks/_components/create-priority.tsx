'use client';

import { cn } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';
import Tag from '../../../components/common/tag';

interface Props {
	field: ControllerRenderProps<
		{
			title: string;
			description: string;
			courseId: string | null;
			priority: 'A' | 'B' | 'C' | null;
			dueDate: Date | null;
			completed?: boolean | undefined;
		},
		'priority'
	>;
}

const CreatePriority = ({ field }: Props) => {
	return (
		<div className='grid grid-cols-3 gap-2 transition'>
			<Tag
				className={cn(
					'h-9 bg-green-100 text-green-500 transition-all duration-500 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 ',
					field.value === 'C' &&
						'bg-green-500 text-white hover:bg-green-400 dark:bg-green-500 dark:text-white',
					(field.value === 'A' || field.value === 'B') &&
						'opacity-50',
				)}
				onClick={() => {
					if (field.value === 'C') {
						field.onChange(null);
					} else {
						field.onChange('C');
					}
				}}
				text={'Low'}
			/>
			<Tag
				className={cn(
					'h-9 bg-yellow-100 text-yellow-500 transition-all duration-500 hover:bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100',
					field.value === 'B' &&
						'bg-yellow-500 text-white hover:bg-yellow-400 dark:bg-yellow-500 dark:text-white',
					(field.value === 'A' || field.value === 'C') &&
						'opacity-50',
				)}
				onClick={() => {
					if (field.value === 'B') {
						field.onChange(null);
					} else {
						field.onChange('B');
					}
				}}
				text={'Medium'}
			/>
			<Tag
				className={cn(
					'h-9 bg-red-100 text-red-500 transition-all duration-500 hover:bg-red-200 dark:bg-red-800 dark:text-red-100',
					field.value === 'A' &&
						'bg-red-500 text-white hover:bg-red-400 dark:bg-red-500 dark:text-white',
					(field.value === 'C' || field.value === 'B') &&
						'opacity-50',
				)}
				onClick={() => {
					if (field.value === 'A') {
						field.onChange(null);
					} else {
						field.onChange('A');
					}
				}}
				text={'High'}
			/>
		</div>
	);
};

export default CreatePriority;
