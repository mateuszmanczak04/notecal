'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ListView = () => {
	const { data: notes } = useNotes();
	const { data: courses } = useCourses();

	return (
		<div className=' mt-4 flex flex-col items-center gap-2'>
			{notes &&
				courses &&
				notes.map(note => {
					const course = courses.find(c => c.id === note.courseId);
					return (
						<Link
							href={`/notes/${note.id}`}
							className='flex w-[clamp(240px,50%,800px)] items-center justify-between gap-4 rounded-xl p-4 hover:opacity-90'
							style={{ backgroundColor: course?.color }}
							key={note.id}>
							<div>
								<p className='font-semibold'>{note.title || course?.name}</p>
								<p className='text-sm opacity-75'>{note.content}</p>
							</div>
							<ChevronRight className='size-7 shrink-0' />
						</Link>
					);
				})}
		</div>
	);
};

export default ListView;
