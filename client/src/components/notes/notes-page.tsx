import Editor from './components/editor/editor';
import NoteSidebar from './components/sidebar/note-sidebar';
import { NoteContextProvider } from './context/note-context';

// Had to extract it to a separate file to use metadata API.
const NotesPage = () => {
	return (
		<NoteContextProvider>
			<title>Notes</title>
			<article className='scrollbar-hide flex h-screen'>
				<Editor />
				<NoteSidebar />
			</article>
		</NoteContextProvider>
	);
};

export default NotesPage;
