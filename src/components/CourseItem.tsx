import { Pencil, Trash2 } from 'lucide-react';
import Button from './Button';
import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';
import { FC } from 'react';

interface CourseItemProps {
	name: string;
	id: string;
}

const CourseItem: FC<CourseItemProps> = async ({ name, id }) => {
	const session = await auth();
	if (!session) redirect('/auth/signup');

	return (
		<div className='flex w-full flex-col rounded-md bg-gray-100 p-4 text-lg font-semibold text-black'>
			<p>{name}</p>
			<div className='mt-2 flex w-full justify-between gap-2'>
				<Button
					size='small'
					className='flex flex-1 items-center justify-center gap-1'
					variant='primary'>
					Notes
				</Button>
				<Button
					size='small'
					className='flex flex-1 items-center justify-center gap-1 '
					variant='secondary'>
					<Pencil className='h-4 w-4' />
					Edit
				</Button>
				<Button
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
