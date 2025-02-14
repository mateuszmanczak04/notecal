import { Metadata } from 'next';
import Editor from './_components/editor/editor';
import NoteSidebar from './_components/sidebar/note-sidebar';
import { NoteContextProvider } from './_content/note-context';

export const metadata: Metadata = {
	title: 'Notecal | Note',
	robots: {
		index: false,
	},
};

// Had to extract it to a separate file to use metadata API.
const page = () => {
	return (
		<NoteContextProvider>
			<main className='mx-auto flex h-full min-h-80 flex-col md:flex-row'>
				<article className='flex h-screen flex-1 flex-col'>
					<Editor />
				</article>

				<NoteSidebar />
			</main>
		</NoteContextProvider>
	);
};

export default page;
