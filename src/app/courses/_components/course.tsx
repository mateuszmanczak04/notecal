import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
	name: string;
	id: string;
	teacher: string;
	color: string;
};

const Course = ({ name, teacher, id, color }: Props) => {
	return (
		<Link
			href={`/notes/${id}`}
			className='flex cursor-pointer items-center justify-between rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: color }}>
			<div>
				<p className='line-clamp-1 rounded-xl text-xl font-medium'>{name}</p>
				<p className='mt-1 line-clamp-1 opacity-75'>{teacher}</p>
			</div>
			<ChevronRight className='h-10 w-10 shrink-0' />
		</Link>
	);
};

export default Course;
