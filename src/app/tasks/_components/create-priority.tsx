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
					'h-9 bg-green-100 text-green-800 transition-all duration-500 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 ',
					field.value === 'C' &&
						'bg-green-600 text-white hover:bg-green-500 dark:bg-green-600 dark:text-white dark:hover:bg-green-500',
					(field.value === 'A' || field.value === 'B') &&
						'opacity-100',
				)}
				onClick={() => {
					if (field.value === 'C') {
						field.onChange(null);
					} else {
						field.onChange('C');
					}
				}}>
				Low
			</Tag>
			<Tag
				className={cn(
					'h-9 bg-yellow-100 text-yellow-800 transition-all duration-500 hover:bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100',
					field.value === 'B' &&
						'bg-yellow-600 text-white hover:bg-yellow-500 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500',
					(field.value === 'A' || field.value === 'C') &&
						'opacity-100',
				)}
				onClick={() => {
					if (field.value === 'B') {
						field.onChange(null);
					} else {
						field.onChange('B');
					}
				}}>
				Medium
			</Tag>
			<Tag
				className={cn(
					'h-9 bg-red-100 text-red-800 transition-all duration-500 hover:bg-red-200 dark:bg-red-800 dark:text-red-100',
					field.value === 'A' &&
						'bg-red-600 text-white hover:bg-red-500 dark:bg-red-600 dark:text-white dark:hover:bg-red-500',
					(field.value === 'C' || field.value === 'B') &&
						'opacity-100',
				)}
				onClick={() => {
					if (field.value === 'A') {
						field.onChange(null);
					} else {
						field.onChange('A');
					}
				}}>
				High
			</Tag>
		</div>
	);
};

export default CreatePriority;
