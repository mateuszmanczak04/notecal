import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { type Task } from '@/types';

const TaskItem = ({ title, description, course, priority, date }: Task) => {
	return (
		<Card className='shadow-none'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<p>{title}</p>
					<Checkbox className='h-5 w-5 shadow-none' />
				</CardTitle>
				<CardDescription>{description}</CardDescription>
				<div className='flex items-center gap-1'>
					<Badge className='pointer-events-none bg-purple-600 shadow-none'>
						{course}
					</Badge>
					<Badge
						className={cn(
							'pointer-events-none shadow-none',
							priority === 3 && 'bg-red-500',
							priority === 2 && 'bg-amber-500',
							priority === 1 && 'bg-green-500',
						)}>
						{priority}
					</Badge>
					<Badge className='pointer-events-none bg-neutral-200 text-neutral-800 shadow-none'>
						{date}
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
};

export default TaskItem;
