'use client';

import Content from '@/app/notes/_components/content';
import DeleteButton from '@/app/notes/_components/delete-button';
import Tasks from '@/app/notes/_components/tasks';
import Teacher from '@/app/notes/_components/teacher';
import Time from '@/app/notes/_components/time';
import Title from '@/app/notes/_components/title';
import GoBackButton from '@/components/common/go-back-button';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import SideNotes from '../../_components/side-notes';
import { useNoteContext } from '../../_context/note-context';

const NotePage = () => {
	const { course } = useNoteContext();

	return (
		<div className='mx-auto flex h-full min-h-80 max-w-[1200px] gap-4'>
			<div className='flex h-full flex-1 flex-col'>
				<div className='flex gap-2'>
					<GoBackButton variant='secondary' className='w-fit'>
						<ArrowLeft />
						Go back
					</GoBackButton>
					<Button asChild variant='secondary'>
						<Link href={`/courses/edit?id=${course.id}`}>
							<Pencil />
							Edit
						</Link>
					</Button>
				</div>
				<Title />
				<Time />
				<Content />
			</div>
			<div className='flex h-full w-48 shrink-0 flex-col gap-8 overflow-y-scroll scrollbar-hide'>
				<SideNotes />
				<Tasks />
				<Teacher />
				<DeleteButton />
			</div>
		</div>
	);
};

export default NotePage;
