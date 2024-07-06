'use client';

import DeleteButton from '@/app/notes/_components/delete-button';
import Content from '@/app/notes/_components/content';
import Tasks from '@/app/notes/_components/tasks';
import Teacher from '@/app/notes/_components/teacher';
import Time from '@/app/notes/_components/time';
import Title from '@/app/notes/_components/title';
import SideNotes from '../../_components/side-notes';
import useNotes from '@/app/notes/_hooks/use-notes';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import GoBackButton from '@/components/common/go-back-button';
import { ArrowLeft } from 'lucide-react';

const NotePage = () => {
	const params = useParams();
	const queryClient = useQueryClient();
	const { notes } = useNotes();

	useEffect(() => {
		const id = params.id;
		const currentNote = notes?.filter(note => note.id === id)[0];
		if (!currentNote) {
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		}
	}, [notes, params.id, queryClient]);

	return (
		<div className='mx-auto flex h-full min-h-80 max-w-[1200px] gap-4'>
			<div className='flex h-full flex-1 flex-col'>
				<GoBackButton variant='secondary' className='w-fit'>
					<ArrowLeft className='h-4 w-4' />
					Go back
				</GoBackButton>
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
