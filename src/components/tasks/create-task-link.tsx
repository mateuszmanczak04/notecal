import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const CreateTaskLink = () => {
	return (
		<Button
			asChild
			variant='default'
			className='flex items-center justify-center gap-1 font-semibold sm:flex-1'>
			<Link href='/tasks/create'>
				<Plus className='h-6 w-6' /> Create a New Task
			</Link>
		</Button>
	);
};

export default CreateTaskLink;
