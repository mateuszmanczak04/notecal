import Editor from './components/editor/editor';
import NoteSidebar from './components/sidebar/note-sidebar';
import { NoteContextProvider } from './context/note-context';

// Had to extract it to a separate file to use metadata API.
const NotesPage = () => {
	return (
		<NoteContextProvider>
			<title>Notes</title>
			<main className='mx-auto flex h-full min-h-80 flex-col md:flex-row'>
				<article className='flex h-screen flex-1 flex-col'>
					<Editor />
				</article>

				<NoteSidebar />
			</main>
		</NoteContextProvider>
	);
};

export default NotesPage;
