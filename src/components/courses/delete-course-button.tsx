'use client';

import deleteCourse from '@/actions/delete-course';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { FC, useTransition } from 'react';

interface DeleteCourseButtonProps {
	id: string;
}

const DeleteCourseButton: FC<DeleteCourseButtonProps> = ({ id }) => {
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(() => {
			deleteCourse({ id });
		});
	};

	return (
		<Button
			onClick={onClick}
			variant='destructive'
			className='w-full flex-1 gap-1'
			disabled={isPending}>
			<Trash2 className='h-4 w-4' />
			Delete Course
		</Button>
	);
};

export default DeleteCourseButton;
