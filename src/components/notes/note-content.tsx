'use client';

import { useNoteContext } from '@/components/notes/note-context';

const DUMMY_CONTENT = [
	{
		id: '1',
		type: 'h1',
		title: 'This is my best ever heading',
	},
	{
		id: '2',
		type: 'h2',
		title: 'The subheading from Mateusz',
	},
	{
		id: '3',
		type: 'p',
		title: 'Lorem ipsum should be here for were forgotten.',
	},
	{
		id: '4',
		type: 'h3',
		title: 'Dont like this shit',
	},
];

const NoteContent = () => {
	const {
		blocksIsLoading: isLoading,
		blocks,
		blocksError: error,
	} = useNoteContext();

	if (error) {
		return <p className='rounded-md bg-red-100 p-2 text-red-800'>{error}</p>;
	}

	if (isLoading) {
		return <p className='animate-bounce'>Loading...</p>;
	}

	return (
		<div className='mt-2 flex flex-col gap-4 rounded-md bg-gray-100 p-4'>
			{blocks?.map(block => {
				switch (block.type) {
					case 'h1':
						return (
							<h1 key={block.id} className='text-2xl font-semibold'>
								{block.title}
							</h1>
						);
					case 'h2':
						return (
							<h2 key={block.id} className='text-xl font-semibold'>
								{block.title}
							</h2>
						);
					case 'h3':
						return (
							<h3 key={block.id} className='text-lg font-semibold'>
								{block.title}
							</h3>
						);
					case 'p':
					default:
						return <p key={block.id}>{block.title}</p>;
				}
			})}
		</div>
	);
};

export default NoteContent;
