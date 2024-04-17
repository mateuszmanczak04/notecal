import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { NotebookPen, Pencil } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface CourseItemProps {
	name: string;
	id: string;
	teacher: string;
}

// This component is used to display a course item in the courses list
// It just has 2 links to the notes page and the edit page
const CourseItem: FC<CourseItemProps> = ({ name, teacher, id }) => {
	return (
		<Card className='shadow-none'>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{teacher}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex h-full w-full gap-2'>
					<Button
						asChild
						className='flex flex-1 items-center justify-center gap-1'
						size='sm'>
						<Link href={`/courses/notes?id=${id}`}>
							<NotebookPen className='h-4 w-4' />
							Notes
						</Link>
					</Button>
					<Button
						asChild
						className='flex flex-1 items-center justify-center gap-1'
						size='sm'
						variant='secondary'>
						<Link href={`/courses/edit?id=${id}`}>
							<Pencil className='h-4 w-4' />
							Edit
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseItem;
