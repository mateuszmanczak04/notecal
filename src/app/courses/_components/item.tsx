import { EllipsisVertical } from 'lucide-react';
import { FC } from 'react';
import useNotes from '@/app/notes/_hooks/use-notes';
import NoteLink from './note-link';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseItemProps {
	name: string;
	id: string;
	teacher: string;
	color: string;
}

const Item: FC<CourseItemProps> = ({ name, teacher, id, color }) => {
	const { notes, isPending } = useNotes();
	const filteredNotes = notes?.filter(note => note.courseId === id);

	return (
		<div className='flex border-b border-gray-200 p-4'>
			<div className='flex flex-1 flex-col'>
				<p className={`font-bold text-[${color}]`}>{name}</p>
				<p className='mt-1'>{teacher}</p>
				{isPending ? (
					<div className='mt-2 flex gap-2'>
						<Skeleton className='h-6 w-14 bg-gray-100' />
						<Skeleton className='h-6 w-16 bg-gray-100' />
						<Skeleton className='h-6 w-16 bg-gray-100' />
					</div>
				) : (
					<div className='mt-2 flex gap-2'>
						{filteredNotes?.map(note => <NoteLink key={note.id} note={note} />)}
					</div>
				)}
			</div>
			<div>
				<EllipsisVertical className='h-6 w-6' />
			</div>
		</div>
	);
};

export default Item;
