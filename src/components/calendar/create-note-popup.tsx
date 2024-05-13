'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import useCourses from '@/hooks/use-courses';
import { cn } from '@/lib/utils';
import { FC, useLayoutEffect } from 'react';

interface CreateNotePopupProps {
	clickX: number;
	clickY: number;
	submit: (courseId: string) => void;
	show: boolean;
}

const CreateNotePopup: FC<CreateNotePopupProps> = ({
	clickX,
	clickY,
	submit,
	show,
}) => {
	const { data: coursesData } = useCourses();

	if (!coursesData?.courses) {
		return null;
	}

	return (
		<div
			className={cn(
				'z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-xl',
				`left-1/2 top-1/2`,
				show ? 'fixed' : 'hidden',
			)}>
			<Select onValueChange={value => submit(value)}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Course' />
				</SelectTrigger>
				<SelectContent>
					{coursesData.courses.map(course => {
						return (
							<SelectItem key={course.id} value={course.id}>
								{course.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
};

export default CreateNotePopup;
