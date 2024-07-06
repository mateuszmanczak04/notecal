import { FC } from 'react';
import useNotes from '@/app/notes/_hooks/use-notes';
import NoteLink from './note-link';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Menu from './menu';
import CreateFirstNote from './create-first-note';

interface CourseProps {
	name: string;
	id: string;
	teacher: string;
	color: string;
}

const Course: FC<CourseProps> = ({ name, teacher, id, color }) => {
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
					<div className='mt-2 flex flex-wrap gap-2'>
						{filteredNotes?.length === 0 ? (
							<CreateFirstNote courseId={id} />
						) : (
							filteredNotes?.map(note => <NoteLink key={note.id} note={note} />)
						)}
					</div>
				)}
			</div>
			<Menu courseId={id} />
		</div>
	);
};

export default Course;
