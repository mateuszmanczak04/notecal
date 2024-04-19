import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const CreateTaskButton = () => {
	return (
		<Button
			asChild
			variant='default'
			className='flex w-full items-center justify-center gap-1 font-semibold md:flex-1'>
			<Link href='/tasks/create'>
				<Plus className='h-6 w-6' /> Create a New Task
			</Link>
		</Button>
	);
};

export default CreateTaskButton;
