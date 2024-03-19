import { Pencil } from 'lucide-react';
import { buttonVariants } from './Button';
import { FC } from 'react';
import Link from 'next/link';

interface CourseItemProps {
	name: string;
	id: string;
	teacher: string;
}

// This component is used to display a course item in the courses list
// It just has 2 links to the notes page and the edit page
const CourseItem: FC<CourseItemProps> = ({ name, teacher, id }) => {
	return (
		<div className='flex w-full flex-col rounded-md bg-gray-100 p-4 text-lg font-semibold text-black'>
			<p>{name}</p>
			<p className='text-sm font-normal text-gray-500'>{teacher}</p>
			<div className='mt-2 flex w-full justify-between gap-2'>
				<Link
					href={`/courses/notes?id=${id}`}
					className={buttonVariants({
						variant: 'primary',
						size: 'small',
						className: 'flex flex-1 items-center justify-center gap-1',
					})}>
					Notes
				</Link>
				<Link
					href={`/courses/edit?id=${id}`}
					className={buttonVariants({
						variant: 'secondary',
						size: 'small',
						className: 'flex flex-1 items-center justify-center gap-1',
					})}>
					<Pencil className='h-4 w-4' />
					Edit
				</Link>
			</div>
		</div>
	);
};

export default CourseItem;
