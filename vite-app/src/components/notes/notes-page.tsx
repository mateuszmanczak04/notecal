import { useSettings } from '../../hooks/use-settings';
import Editor from './components/editor/editor';
import NoteSidebar from './components/sidebar/note-sidebar';
import { NoteContextProvider } from './context/note-context';

// Had to extract it to a separate file to use metadata API.
const NotesPage = () => {
	const { noteSidebarWidth, showNoteSidebar } = useSettings();

	return (
		<NoteContextProvider>
			<title>Notes</title>
			<article
				className='flex h-screen flex-1 flex-col'
				style={{ paddingRight: showNoteSidebar ? `${noteSidebarWidth}px` : 0 }}>
				<Editor />
			</article>

			<NoteSidebar />
		</NoteContextProvider>
	);
};

export default NotesPage;
