import { Button } from '@/components/ui/button';
import { ListOrdered, Plus } from 'lucide-react';
import Link from 'next/link';
import SortTasks from './sort-tasks';

const Controls = () => {
	return (
		<div className='flex gap-4'>
			{/* <Button
				variant='secondary'
				size='lg'
				className='flex flex-1 items-center justify-center gap-1 font-semibold'>
				<ListOrdered className='h-6 w-6' /> Order by
			</Button> */}
			<SortTasks />
			<Button
				asChild
				size='lg'
				className='flex flex-1 items-center justify-center gap-1 font-semibold'>
				<Link href='/tasks/create'>
					<Plus className='h-5 w-5' /> Create a New Task
				</Link>
			</Button>
		</div>
	);
};

export default Controls;
