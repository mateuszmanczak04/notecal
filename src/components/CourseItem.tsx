'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Button, { buttonVariants } from './Button';
import { FC, startTransition } from 'react';
import deleteCourse from '@/actions/deleteCourse';
import Link from 'next/link';

interface CourseItemProps {
	name: string;
	id: string;
}

const CourseItem: FC<CourseItemProps> = ({ name, id }) => {
	const handleDelete = async () => {
		startTransition(() => {
			deleteCourse(id);
		});
	};

	return (
		<div className='flex w-full flex-col rounded-md bg-gray-100 p-4 text-lg font-semibold text-black'>
			<p>{name}</p>
			<div className='mt-2 flex w-full justify-between gap-2'>
				<Link
					href={`/courses/${id}/notes`}
					className={buttonVariants({
						variant: 'primary',
						size: 'small',
						className: 'flex flex-1 items-center justify-center gap-1',
					})}>
					Notes
				</Link>
				<Button
					size='small'
					className='flex flex-1 items-center justify-center gap-1 '
					variant='secondary'>
					<Pencil className='h-4 w-4' />
					Edit
				</Button>
				<Button
					onClick={handleDelete}
					size='small'
					className='flex flex-1 items-center justify-center gap-1'
					variant='secondary'>
					<Trash2 className='h-4 w-4' />
					Delete
				</Button>
			</div>
		</div>
	);
};

export default CourseItem;
