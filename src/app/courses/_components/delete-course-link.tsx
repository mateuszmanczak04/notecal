import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface DeleteCourseLinkProps {
	id: string;
}

const DeleteCourseLink: FC<DeleteCourseLinkProps> = ({ id }) => {
	return (
		<Button asChild variant='destructive' className='w-full gap-1'>
			<Link href={`/courses/delete?id=${id}`}>
				<Trash2 className='h-4 w-4' />
				Delete Course
			</Link>
		</Button>
	);
};

export default DeleteCourseLink;
