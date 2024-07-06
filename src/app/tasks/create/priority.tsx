'use client';

import { FC } from 'react';
import Tag from '../_components/tag';
import { cn } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';

interface PriorityProps {
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

const Priority: FC<PriorityProps> = ({ field }) => {
	return (
		<div className='flex gap-2 transition'>
			<Tag
				className={cn(
					'flex-1 bg-green-100 text-green-500 transition-all duration-500 hover:bg-green-200',
					field.value === 'C' &&
						'flex-[2] bg-green-500 text-white hover:bg-green-400',
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
					'flex-1 bg-yellow-100 text-yellow-500 transition-all duration-500 hover:bg-yellow-200',
					field.value === 'B' &&
						'flex-[2] bg-yellow-500 text-white hover:bg-yellow-400',
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
					'flex-1 bg-red-100 text-red-500 transition-all duration-500 hover:bg-red-200',
					field.value === 'A' &&
						'flex-[2] bg-red-500 text-white hover:bg-red-400',
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

export default Priority;
