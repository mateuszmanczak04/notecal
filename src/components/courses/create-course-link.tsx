import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const CreateCourseLink = () => {
	return (
		<Button
			asChild
			variant='secondary'
			size='lg'
			className='flex items-center justify-center gap-1 font-semibold'>
			<Link href='/courses/create'>
				<Plus className='h-6 w-6' /> Create a New Course
			</Link>
		</Button>
	);
};

export default CreateCourseLink;
