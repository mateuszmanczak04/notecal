'use client';

import { parseLexicalJsonToPlainText } from '@/app/notes/_editor/parse-lexical-json-to-plain-text';
import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { format } from 'date-fns';
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
							className='flex w-[clamp(240px,100%,800px)] items-center justify-between gap-4 rounded-xl p-4 text-white hover:opacity-90'
							style={{ backgroundColor: course?.color }}
							key={note.id}>
							<div className='min-w-0'>
								<div className='flex gap-2'>
									<p>{format(note.startTime, 'P, HH:MM')}</p>-
									<p>{format(note.endTime, 'P, HH:MM')}</p>
								</div>
								<p className='mt-2 truncate text-lg'>{course?.name}</p>
								<p className='mt-2 truncate text-lg font-semibold'>{note.title}</p>
								<p className='mt-2 line-clamp-4 w-full whitespace-pre-line text-sm opacity-75'>
									{parseLexicalJsonToPlainText(JSON.parse(note.content))}
								</p>
							</div>
							<ChevronRight className='size-7 shrink-0' />
						</Link>
					);
				})}
		</div>
	);
};

export default ListView;
