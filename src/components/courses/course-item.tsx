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

const CourseItem: FC<CourseItemProps> = ({ name, teacher, id }) => {
	return (
		<Card className='border-none bg-primary/5 shadow-none dark:bg-white/5'>
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
						<Link href={`/notes/${id}`}>
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
